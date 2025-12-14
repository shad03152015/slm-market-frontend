import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Star, Zap, Activity, HardDrive, ExternalLink, ArrowLeft, Calendar, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const SLMDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slm, setSlm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSLM();
  }, [id]);

  const fetchSLM = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/slms/${id}`);
      setSlm(response.data);
    } catch (error) {
      toast.error('Failed to load SLM details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="slm-detail-loading">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!slm) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="slm-detail-not-found">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">SLM Not Found</h2>
          <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/marketplace')}
          className="mb-6"
          data-testid="slm-detail-back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        {/* Header Card */}
        <Card className="p-8 mb-6" data-testid="slm-detail-header">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold tracking-tight mb-3" data-testid="slm-detail-name">
                {slm.name}
              </h1>
              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span data-testid="slm-detail-author">{slm.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span data-testid="slm-detail-company">{slm.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono-metrics" data-testid="slm-detail-date">{slm.date_released}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-amber-500">
              <Star className="w-8 h-8 fill-amber-500 star-glow" />
              <span className="font-mono-metrics text-3xl font-bold" data-testid="slm-detail-stars">{slm.star_count}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Description</h2>
            <p className="text-foreground/80 leading-relaxed" data-testid="slm-detail-description">
              {slm.description}
            </p>
          </div>

          <Button
            onClick={() => window.open(slm.website_url, '_blank')}
            className="rounded-full"
            data-testid="slm-detail-website-button"
          >
            Visit Website
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Card>

        {/* Performance Metrics Card */}
        <Card className="p-8" data-testid="slm-detail-metrics">
          <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-emerald-500/20">
                  <Zap className="w-8 h-8 text-emerald-500" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono-metrics text-3xl font-bold mb-2" data-testid="slm-detail-speed">
                  {slm.performance_metrics.speed_ms}ms
                </div>
                <div className="text-muted-foreground font-medium">Inference Speed</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Average time to process a single query
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-blue-500/10 border-2 border-blue-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-blue-500/20">
                  <HardDrive className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono-metrics text-3xl font-bold mb-2" data-testid="slm-detail-size">
                  {slm.performance_metrics.size_mb}MB
                </div>
                <div className="text-muted-foreground font-medium">Model Size</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Total storage required for deployment
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-lg bg-indigo-500/20">
                  <Activity className="w-8 h-8 text-indigo-500" />
                </div>
              </div>
              <div className="text-center">
                <div className="font-mono-metrics text-3xl font-bold mb-2" data-testid="slm-detail-accuracy">
                  {slm.performance_metrics.accuracy_percent}%
                </div>
                <div className="text-muted-foreground font-medium">Accuracy</div>
                <p className="text-sm text-muted-foreground mt-2">
                  Benchmark performance on standard tasks
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
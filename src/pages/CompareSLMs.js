import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Star, Zap, HardDrive, Activity, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const CompareSLMs = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [slms, setSlms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      fetchSLMs(ids);
    }
  }, [searchParams]);

  const fetchSLMs = async (ids) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/slms/compare/multiple?ids=${ids}`);
      setSlms(response.data);
    } catch (error) {
      toast.error('Failed to load SLMs for comparison');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="compare-loading">
        <div className="text-lg text-muted-foreground">Loading comparison...</div>
      </div>
    );
  }

  if (slms.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="compare-empty">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No models to compare</h2>
          <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/marketplace')}
          className="mb-6"
          data-testid="compare-back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2" data-testid="compare-title">Model Comparison</h1>
          <p className="text-muted-foreground">Side-by-side comparison of selected models</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="compare-grid">
          {slms.map((slm) => (
            <Card key={slm.id} className="p-6" data-testid={`compare-card-${slm.id}`}>
              {/* Header */}
              <div className="mb-6 pb-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-bold tracking-tight" data-testid="compare-model-name">{slm.name}</h2>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star className="w-5 h-5 fill-amber-500" />
                    <span className="font-mono-metrics font-bold">{slm.star_count}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{slm.author} • {slm.company}</p>
              </div>

              {/* Metrics */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">Speed</span>
                  </div>
                  <span className="font-mono-metrics font-bold">{slm.performance_metrics.speed_ms}ms</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center space-x-3">
                    <HardDrive className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">Size</span>
                  </div>
                  <span className="font-mono-metrics font-bold">{slm.performance_metrics.size_mb}MB</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center space-x-3">
                    <Activity className="w-5 h-5 text-indigo-500" />
                    <span className="text-sm font-medium">Accuracy</span>
                  </div>
                  <span className="font-mono-metrics font-bold">{slm.performance_metrics.accuracy_percent}%</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={() => navigate(`/slm/${slm.id}`)}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => window.open(slm.website_url, '_blank')}
                  variant="ghost"
                  className="w-full rounded-full"
                >
                  Website
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
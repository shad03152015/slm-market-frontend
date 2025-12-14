import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const SubmitSLM = () => {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    company: '',
    date_released: '',
    website_url: '',
    description: '',
    speed_ms: '',
    size_mb: '',
    accuracy_percent: '',
  });

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: formData.name,
        author: formData.author,
        company: formData.company,
        date_released: formData.date_released,
        website_url: formData.website_url,
        description: formData.description,
        performance_metrics: {
          speed_ms: parseFloat(formData.speed_ms),
          size_mb: parseFloat(formData.size_mb),
          accuracy_percent: parseFloat(formData.accuracy_percent),
        },
      };

      await axios.post(`${BACKEND_URL}/api/slms`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('SLM submitted successfully!');
      navigate('/marketplace');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to submit SLM');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/marketplace')}
          className="mb-6"
          data-testid="submit-back-button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <Card className="p-8" data-testid="submit-form-card">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2" data-testid="submit-title">Submit Your SLM</h1>
            <p className="text-muted-foreground">Share your small language model with the community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Basic Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Model Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., MicroLM-500M"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="submit-name-input"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="Your name"
                    value={formData.author}
                    onChange={handleChange}
                    required
                    data-testid="submit-author-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Company or organization"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    data-testid="submit-company-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date_released">Release Date *</Label>
                  <Input
                    id="date_released"
                    name="date_released"
                    type="date"
                    value={formData.date_released}
                    onChange={handleChange}
                    required
                    data-testid="submit-date-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL *</Label>
                  <Input
                    id="website_url"
                    name="website_url"
                    type="url"
                    placeholder="https://..."
                    value={formData.website_url}
                    onChange={handleChange}
                    required
                    data-testid="submit-url-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your model's capabilities, use cases, and unique features..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  data-testid="submit-description-input"
                />
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4 pt-6 border-t">
              <h2 className="text-xl font-bold">Performance Metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="speed_ms">Inference Speed (ms) *</Label>
                  <Input
                    id="speed_ms"
                    name="speed_ms"
                    type="number"
                    step="0.01"
                    placeholder="50"
                    value={formData.speed_ms}
                    onChange={handleChange}
                    required
                    data-testid="submit-speed-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size_mb">Model Size (MB) *</Label>
                  <Input
                    id="size_mb"
                    name="size_mb"
                    type="number"
                    step="0.1"
                    placeholder="150"
                    value={formData.size_mb}
                    onChange={handleChange}
                    required
                    data-testid="submit-size-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accuracy_percent">Accuracy (%) *</Label>
                  <Input
                    id="accuracy_percent"
                    name="accuracy_percent"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="92.5"
                    value={formData.accuracy_percent}
                    onChange={handleChange}
                    required
                    data-testid="submit-accuracy-input"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-12"
              disabled={loading}
              data-testid="submit-button"
            >
              {loading ? 'Submitting...' : 'Submit Model'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SLMCard } from '../components/SLMCard';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const Marketplace = () => {
  const [slms, setSlms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [sortBy, setSortBy] = useState('stars');

  useEffect(() => {
    fetchSLMs();
  }, [searchQuery, companyFilter, sortBy]);

  const fetchSLMs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (companyFilter) params.append('company', companyFilter);
      if (sortBy) params.append('sort_by', sortBy);

      const response = await axios.get(`${BACKEND_URL}/api/slms?${params.toString()}`);
      setSlms(response.data);
    } catch (error) {
      toast.error('Failed to load SLMs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = () => {
    if (slms.length >= 2) {
      const ids = slms.slice(0, 3).map(s => s.id).join(',');
      window.open(`/compare?ids=${ids}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4" data-testid="marketplace-title">
            SLM Marketplace
          </h1>
          <p className="text-lg text-muted-foreground">
            Browse and discover the latest small language models
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative col-span-1 md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search models, authors, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
                data-testid="marketplace-search-input"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12" data-testid="marketplace-sort-select">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="date">Newest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Filter by company..."
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="w-64 h-10"
                data-testid="marketplace-company-filter"
              />
              {companyFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCompanyFilter('')}
                  data-testid="marketplace-clear-filter"
                >
                  Clear
                </Button>
              )}
            </div>

            {slms.length >= 2 && (
              <Button
                variant="outline"
                onClick={handleCompare}
                className="rounded-full"
                data-testid="marketplace-compare-button"
              >
                <Filter className="w-4 h-4 mr-2" />
                Compare Models
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20" data-testid="marketplace-loading">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : slms.length === 0 ? (
          <div className="text-center py-20" data-testid="marketplace-empty">
            <p className="text-lg text-muted-foreground">No models found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground" data-testid="marketplace-results-count">
              Showing {slms.length} model{slms.length !== 1 ? 's' : ''}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="marketplace-grid">
              {slms.map((slm) => (
                <SLMCard key={slm.id} slm={slm} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
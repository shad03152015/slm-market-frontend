import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Zap, Activity, HardDrive } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export const SLMCard = ({ slm }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/slm/${slm.id}`)}
      className="card-hover-effect cursor-pointer bg-card border border-border/50 rounded-xl p-6 group relative overflow-hidden"
      data-testid={`slm-card-${slm.id}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-primary transition-colors" data-testid="slm-card-name">
              {slm.name}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="slm-card-author">
              by {slm.author}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-amber-500" data-testid="slm-card-stars">
            <Star className="w-5 h-5 fill-amber-500 star-glow" />
            <span className="font-mono-metrics font-bold">{slm.star_count}</span>
          </div>
        </div>

        {/* Company & Date */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
          <Badge variant="secondary" className="font-normal" data-testid="slm-card-company">{slm.company}</Badge>
          <span className="font-mono-metrics" data-testid="slm-card-date">{slm.date_released}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2" data-testid="slm-card-description">
          {slm.description}
        </p>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Zap className="w-4 h-4 text-emerald-500 mb-1" />
            <span className="font-mono-metrics text-xs font-bold" data-testid="slm-card-speed">
              {slm.performance_metrics.speed_ms}ms
            </span>
            <span className="text-xs text-muted-foreground">Speed</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <HardDrive className="w-4 h-4 text-blue-500 mb-1" />
            <span className="font-mono-metrics text-xs font-bold" data-testid="slm-card-size">
              {slm.performance_metrics.size_mb}MB
            </span>
            <span className="text-xs text-muted-foreground">Size</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <Activity className="w-4 h-4 text-indigo-500 mb-1" />
            <span className="font-mono-metrics text-xs font-bold" data-testid="slm-card-accuracy">
              {slm.performance_metrics.accuracy_percent}%
            </span>
            <span className="text-xs text-muted-foreground">Accuracy</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
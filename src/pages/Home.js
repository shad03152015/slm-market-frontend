import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Cpu, Zap, Smartphone, Watch } from 'lucide-react';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6" data-testid="hero-badge">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">Efficient AI on the Edge</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="hero-title">
              Discover Small Language Models
              <span className="block text-primary mt-2">Built for Mobile & Wearables</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto" data-testid="hero-description">
              Explore a curated marketplace of optimized language models designed for resource-constrained devices.
              Fast, lightweight, and powerful.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/marketplace')}
                className="rounded-full text-base px-8 h-12"
                data-testid="hero-browse-button"
              >
                Browse Models
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/submit')}
                className="rounded-full text-base px-8 h-12"
                data-testid="hero-submit-button"
              >
                Submit Your Model
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Why Small Language Models?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed for the next generation of AI-powered devices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border/50" data-testid="feature-card-speed">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Optimized for millisecond inference times, perfect for real-time applications on mobile devices.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50" data-testid="feature-card-mobile">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                <Smartphone className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile-First</h3>
              <p className="text-muted-foreground">
                Built to run efficiently on smartphones with limited RAM and processing power.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50" data-testid="feature-card-wearable">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                <Watch className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wearable Ready</h3>
              <p className="text-muted-foreground">
                Compact models that can run on smartwatches, fitness trackers, and IoT devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the community building the future of edge AI
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/marketplace')}
            className="rounded-full text-base px-8 h-12"
            data-testid="cta-button"
          >
            Explore the Marketplace
          </Button>
        </div>
      </section>
    </div>
  );
};
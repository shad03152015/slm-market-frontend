import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Cpu, Moon, Sun, LogOut, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group" data-testid="navbar-logo">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">SLM AccordX AI</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button
                onClick={() => navigate('/submit')}
                className="rounded-full"
                data-testid="navbar-submit-button"
              >
                <Plus className="w-4 h-4 mr-2" />
                Submit SLM
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
              data-testid="theme-toggle"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {isAuthenticated ? (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full"
                data-testid="navbar-logout-button"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="rounded-full"
                data-testid="navbar-login-button"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
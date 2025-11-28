import React from 'react';
import { FileText, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-card-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">ResumeBuilder</h1>
              <p className="text-sm text-muted-foreground">Create professional resumes in minutes</p>
            </div>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent-purple" />
              <span>AI-Powered • 3D Interface</span>
            </div>
            <nav className="flex items-center gap-3 text-sm">
              <a href="/login" className="px-3 py-1 rounded-lg gradient-primary text-white button-3d">Login</a>
            </nav>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-accent transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
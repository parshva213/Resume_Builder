import React, { useState } from 'react';
import { Button } from './ui/button';
import { Palette, Layout, Sparkles, Briefcase, Brush } from 'lucide-react';

type ColorScheme = 'blue' | 'purple' | 'emerald' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal' | 'lime' | 'amber' | 'cyan' | 'violet';

interface TemplateSelectorProps {
  selectedTemplate: 'professional' | 'modern' | 'creative';
  selectedColor: ColorScheme;
  onTemplateChange: (template: 'professional' | 'modern' | 'creative') => void;
  onColorChange: (color: ColorScheme) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  selectedColor,
  onTemplateChange,
  onColorChange,
}) => {
  const templates = [
    {
      id: 'professional' as const,
      name: 'Professional',
      description: 'Clean and corporate design',
      icon: Briefcase,
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Contemporary and sleek',
      icon: Layout,
    },
    {
      id: 'creative' as const,
      name: 'Creative',
      description: 'Bold and artistic layout',
      icon: Brush,
    },
  ];

  const colors = [
    { id: 'blue' as const, name: 'Ocean Blue', class: 'bg-accent-blue' },
    { id: 'purple' as const, name: 'Royal Purple', class: 'bg-accent-purple' },
    { id: 'emerald' as const, name: 'Emerald Green', class: 'bg-accent-emerald' },
    { id: 'orange' as const, name: 'Sunset Orange', class: 'bg-accent-orange' },
    { id: 'red' as const, name: 'Crimson Red', class: 'bg-red-500' },
    { id: 'pink' as const, name: 'Rose Pink', class: 'bg-pink-500' },
    { id: 'indigo' as const, name: 'Deep Indigo', class: 'bg-indigo-500' },
    { id: 'teal' as const, name: 'Aqua Teal', class: 'bg-teal-500' },
    { id: 'lime' as const, name: 'Lime Green', class: 'bg-lime-500' },
    { id: 'amber' as const, name: 'Golden Amber', class: 'bg-amber-500' },
    { id: 'cyan' as const, name: 'Sky Cyan', class: 'bg-cyan-500' },
    { id: 'violet' as const, name: 'Deep Violet', class: 'bg-violet-500' },
  ];

  const [rgba, setRgba] = useState({ r: 14, g: 165, b: 233, a: 1 });
  const rgbaString = `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;

  return (
    <div className="card-3d p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <Sparkles className="w-5 h-5 text-accent-purple" />
        <h2 className="text-xl font-bold text-gradient">Customize Your Resume</h2>
      </div>

      {/* Template Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Layout className="w-4 h-4 mr-2 text-accent-blue" />
          Choose Template
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => onTemplateChange(template.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-left button-3d ${selectedTemplate === template.id
                  ? 'border-primary bg-primary/10 shadow-glow'
                  : 'border-card-border bg-surface hover:border-primary/50'
                  }`}
              >
                <Icon className="w-6 h-6 mb-2 text-accent-purple" />
                <h4 className="font-semibold text-foreground">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="w-4 h-4 mr-2 text-accent-emerald" />
          Color Scheme
        </h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorChange(color.id)}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 button-3d ${selectedColor === color.id
                ? 'bg-primary/20 border-primary ring-2 ring-primary/30'
                : 'bg-surface border border-card-border hover:border-primary/50'
                }`}
            >
              <div className={`w-4 h-4 rounded-full ${color.class}`} />
              <span className="text-sm font-medium">{color.name}</span>
            </button>
          ))}
          {/* RGBA color picker */}
          <div className="flex flex-col items-start gap-1 px-4 py-2 rounded-lg border border-card-border bg-surface">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">Custom RGBA</span>
              <div className="w-6 h-6 rounded-full border ml-2" style={{ background: rgbaString }} />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">R</label>
              <input type="range" min="0" max="255" value={rgba.r} onChange={e => { const v = Number(e.target.value); setRgba(prev => { const next = { ...prev, r: v }; onColorChange(`rgba(${next.r},${next.g},${next.b},${next.a})`); return next; }); }} />
              <span className="text-xs w-6 inline-block">{rgba.r}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">G</label>
              <input type="range" min="0" max="255" value={rgba.g} onChange={e => { const v = Number(e.target.value); setRgba(prev => { const next = { ...prev, g: v }; onColorChange(`rgba(${next.r},${next.g},${next.b},${next.a})`); return next; }); }} />
              <span className="text-xs w-6 inline-block">{rgba.g}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">B</label>
              <input type="range" min="0" max="255" value={rgba.b} onChange={e => { const v = Number(e.target.value); setRgba(prev => { const next = { ...prev, b: v }; onColorChange(`rgba(${next.r},${next.g},${next.b},${next.a})`); return next; }); }} />
              <span className="text-xs w-6 inline-block">{rgba.b}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs">A</label>
              <input type="range" min="0" max="1" step="0.01" value={rgba.a} onChange={e => { const v = Number(e.target.value); setRgba(prev => { const next = { ...prev, a: v }; onColorChange(`rgba(${next.r},${next.g},${next.b},${next.a})`); return next; }); }} />
              <span className="text-xs w-6 inline-block">{rgba.a}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
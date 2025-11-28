import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Award, Star, Globe, Plus, X } from 'lucide-react';

interface AdditionalSectionProps {
  certifications: string[];
  achievements: string[];
  languages: string[];
  onChange: (field: 'certifications' | 'achievements' | 'languages', value: string[]) => void;
}

export const AdditionalSection: React.FC<AdditionalSectionProps> = ({
  certifications,
  achievements,
  languages,
  onChange,
}) => {
  const [newItems, setNewItems] = useState({
    certification: '',
    achievement: '',
    language: '',
  });

  const addItem = (field: 'certifications' | 'achievements' | 'languages', newItemKey: string) => {
    const newItem = newItems[newItemKey as keyof typeof newItems].trim();
    if (newItem) {
      const currentArray = field === 'certifications' ? certifications : 
                          field === 'achievements' ? achievements : languages;
      if (!currentArray.includes(newItem)) {
        onChange(field, [...currentArray, newItem]);
        setNewItems({ ...newItems, [newItemKey]: '' });
      }
    }
  };

  const removeItem = (field: 'certifications' | 'achievements' | 'languages', itemToRemove: string) => {
    const currentArray = field === 'certifications' ? certifications : 
                        field === 'achievements' ? achievements : languages;
    onChange(field, currentArray.filter(item => item !== itemToRemove));
  };

  const sections = [
    {
      title: 'Certifications',
      icon: Award,
      data: certifications,
      field: 'certifications' as const,
      newItemKey: 'certification',
      placeholder: 'AWS Certified Developer',
      color: 'text-accent-blue',
    },
    {
      title: 'Achievements & Awards',
      icon: Star,
      data: achievements,
      field: 'achievements' as const,
      newItemKey: 'achievement',
      placeholder: 'Dean\'s List 2023',
      color: 'text-accent-orange',
    },
    {
      title: 'Languages',
      icon: Globe,
      data: languages,
      field: 'languages' as const,
      newItemKey: 'language',
      placeholder: 'English (Native)',
      color: 'text-accent-emerald',
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <Card key={section.field} className="card-3d">
            <CardHeader>
              <CardTitle className="flex items-center text-gradient">
                <Icon className={`w-5 h-5 mr-2 ${section.color}`} />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder={section.placeholder}
                  value={newItems[section.newItemKey as keyof typeof newItems]}
                  onChange={(e) => setNewItems({ ...newItems, [section.newItemKey]: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItem(section.field, section.newItemKey))}
                  className="input-3d flex-1"
                />
                <Button 
                  onClick={() => addItem(section.field, section.newItemKey)} 
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              {section.data.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {section.data.map((item, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="flex items-center gap-1 px-3 py-1 bg-surface border border-card-border"
                    >
                      {item}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(section.field, item)}
                        className="h-auto p-0 ml-1 hover:bg-transparent"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              
              {section.data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                  {section.field === 'certifications' && 'Add professional certifications and licenses.'}
                  {section.field === 'achievements' && 'Add notable achievements, awards, and recognitions.'}
                  {section.field === 'languages' && 'Add languages you speak and your proficiency level.'}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Briefcase, Plus, Trash2, X } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface ExperienceSectionProps {
  data: ResumeData['experience'];
  onChange: (data: ResumeData['experience']) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, onChange }) => {
  const [newResponsibility, setNewResponsibility] = useState<{ [key: string]: string }>({});

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      position: '',
      company: '',
      duration: '',
      responsibilities: [],
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addResponsibility = (experienceId: string) => {
    const responsibility = newResponsibility[experienceId]?.trim();
    if (responsibility) {
      const experience = data.find(exp => exp.id === experienceId);
      if (experience) {
        updateExperience(experienceId, 'responsibilities', [...experience.responsibilities, responsibility]);
        setNewResponsibility({ ...newResponsibility, [experienceId]: '' });
      }
    }
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const experience = data.find(exp => exp.id === experienceId);
    if (experience) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(experienceId, 'responsibilities', newResponsibilities);
    }
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <Briefcase className="w-5 h-5 mr-2 text-accent-purple" />
          Work Experience & Internships
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((experience) => (
          <div key={experience.id} className="p-4 bg-surface rounded-lg border border-card-border space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-foreground">Experience Entry</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Position/Role *</Label>
                  <Input
                    placeholder="Software Developer Intern"
                    value={experience.position}
                    onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                    className="input-3d"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Company *</Label>
                  <Input
                    placeholder="Tech Corp Inc."
                    value={experience.company}
                    onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                    className="input-3d"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label>Duration *</Label>
                  <Input
                    placeholder="June 2023 - Present"
                    value={experience.duration}
                    onChange={(e) => updateExperience(experience.id, 'duration', e.target.value)}
                    className="input-3d"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Key Responsibilities & Achievements</Label>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a responsibility or achievement"
                    value={newResponsibility[experience.id] || ''}
                    onChange={(e) => setNewResponsibility({ ...newResponsibility, [experience.id]: e.target.value })}
                    className="input-3d min-h-[60px] flex-1"
                    rows={2}
                  />
                  <Button 
                    onClick={() => addResponsibility(experience.id)} 
                    variant="outline" 
                    size="sm"
                    className="self-start mt-2"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {experience.responsibilities.length > 0 && (
                  <div className="space-y-2">
                    {experience.responsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-background rounded border">
                        <span className="text-sm flex-1">{responsibility}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeResponsibility(experience.id, index)}
                          className="h-auto p-1 text-destructive hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <Button onClick={addExperience} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </CardContent>
    </Card>
  );
};
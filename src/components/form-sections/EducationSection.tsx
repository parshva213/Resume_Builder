import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface EducationSectionProps {
  data: ResumeData['education'];
  onChange: (data: ResumeData['education']) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      year: '',
      gpa: '',
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <GraduationCap className="w-5 h-5 mr-2 text-accent-emerald" />
          Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((education) => (
          <div key={education.id} className="p-4 bg-surface rounded-lg border border-card-border space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-foreground">Education Entry</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  placeholder="University of Technology"
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  className="input-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  placeholder="Bachelor's Degree"
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  className="input-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Field of Study *</Label>
                <Input
                  placeholder="Computer Science"
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  className="input-3d"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Graduation Year *</Label>
                <Input
                  placeholder="2024"
                  value={education.year}
                  onChange={(e) => updateEducation(education.id, 'year', e.target.value)}
                  className="input-3d"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>GPA (Optional)</Label>
                <Input
                  placeholder="3.8/4.0"
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  className="input-3d"
                />
              </div>
            </div>
          </div>
        ))}
        
        <Button onClick={addEducation} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
};
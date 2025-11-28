import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Code, Plus, X } from 'lucide-react';

interface SkillsSectionProps {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <Code className="w-5 h-5 mr-2 text-accent-orange" />
          Skills & Technologies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a skill (e.g., React, Python, UI/UX)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-3d flex-1"
          />
          <Button onClick={addSkill} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {data.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="flex items-center gap-1 px-3 py-1 bg-surface border border-card-border"
              >
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill)}
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
        
        {data.length === 0 && (
          <p className="text-muted-foreground text-sm">
            Add your technical skills, programming languages, tools, and technologies.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
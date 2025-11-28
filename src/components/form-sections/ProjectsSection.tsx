import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FolderOpen, Plus, Trash2, X, Link as LinkIcon } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface ProjectsSectionProps {
  data: ResumeData['projects'];
  onChange: (data: ResumeData['projects']) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, onChange }) => {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: [],
      link: '',
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const updateProject = (id: string, field: string, value: any) => {
    onChange(data.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      const project = data.find(p => p.id === projectId);
      if (project && !project.technologies.includes(tech)) {
        updateProject(projectId, 'technologies', [...project.technologies, tech]);
        setNewTech({ ...newTech, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(tech => tech !== techToRemove));
    }
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <FolderOpen className="w-5 h-5 mr-2 text-accent-blue" />
          Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((project) => (
          <div key={project.id} className="p-4 bg-surface rounded-lg border border-card-border space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-foreground">Project Entry</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title *</Label>
                  <Input
                    placeholder="E-commerce Website"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    className="input-3d"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-1" />
                    Project Link (Optional)
                  </Label>
                  <Input
                    placeholder="https://github.com/user/project"
                    value={project.link}
                    onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                    className="input-3d"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                  placeholder="Describe your project, its features, and your role in development..."
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  className="input-3d min-h-[100px]"
                  rows={4}
                />
              </div>
              
              <div className="space-y-3">
                <Label>Technologies Used</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add technology"
                    value={newTech[project.id] || ''}
                    onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(project.id))}
                    className="input-3d flex-1"
                  />
                  <Button onClick={() => addTechnology(project.id)} variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1 bg-primary/10 border border-primary/20 text-primary"
                      >
                        {tech}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTechnology(project.id, tech)}
                          className="h-auto p-0 ml-1 hover:bg-transparent"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        <Button onClick={addProject} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface PersonalInfoSectionProps {
  data: ResumeData['personalInfo'];
  onChange: (data: ResumeData['personalInfo']) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <User className="w-5 h-5 mr-2 text-accent-blue" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="input-3d"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium flex items-center">
              <Mail className="w-4 h-4 mr-1" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="input-3d"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Phone *
            </Label>
            <Input
              id="phone"
              placeholder="+1 (555) 123-4567"
              value={data.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="input-3d"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="New York, NY"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="input-3d"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center">
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              placeholder="linkedin.com/in/johndoe"
              value={data.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className="input-3d"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="portfolio" className="text-sm font-medium flex items-center">
              <Globe className="w-4 h-4 mr-1" />
              Portfolio/Website
            </Label>
            <Input
              id="portfolio"
              placeholder="johndoe.dev"
              value={data.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              className="input-3d"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
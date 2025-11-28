import React from 'react';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import type { ResumeData } from './ResumeBuilder';

interface ResumePreviewProps {
  data: ResumeData;
  template: 'professional' | 'modern' | 'creative';
  colorScheme: 'blue' | 'purple' | 'emerald' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal' | 'lime' | 'amber' | 'cyan' | 'violet';
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  template, 
  colorScheme 
}) => {
  const renderTemplate = () => {
    const props = { data, colorScheme };
    
    switch (template) {
      case 'professional':
        return <ProfessionalTemplate {...props} />;
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      default:
        return <ProfessionalTemplate {...props} />;
    }
  };

  return (
    <div className="resume-preview animate-fade-in w-full overflow-x-hidden">
      <div className="w-full flex justify-start">
        {renderTemplate()}
      </div>
    </div>
  );
};
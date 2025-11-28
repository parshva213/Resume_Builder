import React from 'react';
import { PersonalInfoSection } from './form-sections/PersonalInfoSection';
import { SummarySection } from './form-sections/SummarySection';
import { EducationSection } from './form-sections/EducationSection';
import { SkillsSection } from './form-sections/SkillsSection';
import { ProjectsSection } from './form-sections/ProjectsSection';
import { ExperienceSection } from './form-sections/ExperienceSection';
import { AdditionalSection } from './form-sections/AdditionalSection';
import type { ResumeData } from './ResumeBuilder';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: Partial<ResumeData>) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      <PersonalInfoSection 
        data={data.personalInfo} 
        onChange={(personalInfo) => onChange({ personalInfo })} 
      />
      
      <SummarySection
        data={data.summary}
        onChange={(summary) => onChange({ summary })}
      />
      
      <EducationSection
        data={data.education}
        onChange={(education) => onChange({ education })}
      />
      
      <SkillsSection
        data={data.skills}
        onChange={(skills) => onChange({ skills })}
      />
      
      <ProjectsSection
        data={data.projects}
        onChange={(projects) => onChange({ projects })}
      />
      
      <ExperienceSection
        data={data.experience}
        onChange={(experience) => onChange({ experience })}
      />
      
      <AdditionalSection
        certifications={data.certifications}
        achievements={data.achievements}
        languages={data.languages}
        onChange={(field, value) => onChange({ [field]: value })}
      />
    </div>
  );
};
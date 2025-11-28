import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface TemplateProps {
  data: ResumeData;
  colorScheme: 'blue' | 'purple' | 'emerald' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal' | 'lime' | 'amber' | 'cyan' | 'violet';
}

const colorSchemes = {
  blue: { primary: '#0EA5E9', secondary: '#0369A1', light: '#E0F2FE' },
  purple: { primary: '#8B5CF6', secondary: '#7C3AED', light: '#F3E8FF' },
  emerald: { primary: '#10B981', secondary: '#059669', light: '#D1FAE5' },
  orange: { primary: '#F59E0B', secondary: '#D97706', light: '#FEF3C7' },
  red: { primary: '#EF4444', secondary: '#DC2626', light: '#FEE2E2' },
  pink: { primary: '#EC4899', secondary: '#DB2777', light: '#FCE7F3' },
  indigo: { primary: '#6366F1', secondary: '#4F46E5', light: '#E0E7FF' },
  teal: { primary: '#14B8A6', secondary: '#0D9488', light: '#CCFBF1' },
  lime: { primary: '#84CC16', secondary: '#65A30D', light: '#ECFCCB' },
  amber: { primary: '#F59E0B', secondary: '#D97706', light: '#FEF3C7' },
  cyan: { primary: '#06B6D4', secondary: '#0891B2', light: '#CFFAFE' },
  violet: { primary: '#8B5CF6', secondary: '#7C3AED', light: '#F3E8FF' },
};

export const ProfessionalTemplate: React.FC<TemplateProps> = ({ data, colorScheme }) => {
  let colors;
  if (
    typeof colorScheme === 'string' &&
    (colorScheme.startsWith('#') || colorScheme.startsWith('rgba'))
  ) {
    colors = { primary: colorScheme, secondary: colorScheme, light: '#fff' };
  } else {
    colors = colorSchemes[colorScheme as keyof typeof colorSchemes];
  }

  return (
    <div className="bg-white text-gray-900 p-8 font-sans" style={{ minHeight: '11in', width: '8.5in' }}>
      {/* Header */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: colors.primary }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
          {data.personalInfo.name || 'Your Name'}
        </h1>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-1">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
                {data.personalInfo.location}
              </div>
            )}
          </div>

          <div className="space-y-1">
            {data.personalInfo.linkedin && (
              <div className="flex items-center">
                <Linkedin className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
                {data.personalInfo.linkedin}
              </div>
            )}
            {data.personalInfo.portfolio && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" style={{ color: colors.secondary }} />
                {data.personalInfo.portfolio}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-l-4 pl-3" style={{ color: colors.primary, borderColor: colors.primary }}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-l-4 pl-3" style={{ color: colors.primary, borderColor: colors.primary }}>
            Education
          </h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <div className="text-right text-sm text-gray-600">
                  <p>{edu.year}</p>
                  {edu.gpa && <p>GPA: {edu.gpa}</p>}
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-l-4 pl-3" style={{ color: colors.primary, borderColor: colors.primary }}>
            Experience
          </h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-700">{exp.company}</p>
                </div>
                <p className="text-sm text-gray-600">{exp.duration}</p>
              </div>
              {exp.responsibilities.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-l-4 pl-3" style={{ color: colors.primary, borderColor: colors.primary }}>
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                {project.link && (
                  <ExternalLink className="w-4 h-4" style={{ color: colors.secondary }} />
                )}
              </div>
              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded"
                      style={{ backgroundColor: colors.light, color: colors.secondary }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3 border-l-4 pl-3" style={{ color: colors.primary, borderColor: colors.primary }}>
            Skills & Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm rounded"
                style={{ backgroundColor: colors.light, color: colors.secondary }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Additional Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-md font-bold mb-2" style={{ color: colors.primary }}>Certifications</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.certifications.map((cert, index) => (
                <li key={index}>• {cert}</li>
              ))}
            </ul>
          </section>
        )}

        {data.achievements.length > 0 && (
          <section>
            <h2 className="text-md font-bold mb-2" style={{ color: colors.primary }}>Achievements</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.achievements.map((achievement, index) => (
                <li key={index}>• {achievement}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="text-md font-bold mb-2" style={{ color: colors.primary }}>Languages</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {data.languages.map((language, index) => (
                <li key={index}>• {language}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
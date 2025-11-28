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

export const ModernTemplate: React.FC<TemplateProps> = ({ data, colorScheme }) => {
  let colors: any;
  if (
    typeof colorScheme === 'string' &&
    (colorScheme.startsWith('#') || colorScheme.startsWith('rgba'))
  ) {
    colors = { primary: colorScheme, secondary: colorScheme, light: '#fff' } as const;
  } else {
    colors = colorSchemes[colorScheme as keyof typeof colorSchemes];
  }

  const headerBackground = (colors as any).gradient || colors.primary;

  return (
    <div className="bg-white text-gray-900 font-sans w-full md:w-[8.5in] ml-0" style={{ 
        minHeight: '11in',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
      {/* Header with Gradient */}
      <header className="p-6 text-white relative overflow-hidden" style={{ background: headerBackground }}>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-6">
            {data.personalInfo.name || 'Your Name'}
          </h1>

          <div className="grid grid-cols-2 gap-6 text-sm opacity-90">
            <div className="space-y-3">
              {data.personalInfo.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {data.personalInfo.location}
                </div>
              )}
            </div>

            <div className="space-y-2">
              {data.personalInfo.linkedin && (
                <div className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.portfolio && (
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  {data.personalInfo.portfolio}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 bg-white transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 bg-white transform -translate-x-12 translate-y-12"></div>
      </header>

      <div className="p-6">
        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-6 h-1 rounded mr-3" style={{ backgroundColor: colors.primary }}></div>
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>About Me</h2>
            </div>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 text-sm" style={{ borderColor: colors.primary }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Content Column */}
          <div className="col-span-1 md:col-span-8 space-y-6">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-1 rounded mr-3" style={{ backgroundColor: colors.primary }}></div>
                  <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Experience</h2>
                </div>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-6 relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-gray-200"></div>

                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">{exp.position}</h3>
                          <p className="font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{exp.duration}</span>
                      </div>
                      {exp.responsibilities.length > 0 && (
                        <ul className="space-y-1 text-sm text-gray-700">
                          {exp.responsibilities.map((resp, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0" style={{ backgroundColor: colors.primary }}></span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <div className="flex items-center mb-4">
                  <div className="w-8 h-1 rounded mr-3" style={{ backgroundColor: colors.primary }}></div>
                  <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Featured Projects</h2>
                </div>
                <div className="grid gap-4">
                  {data.projects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{project.title}</h3>
                        {project.link && (
                          <ExternalLink className="w-4 h-4" style={{ color: colors.secondary }} />
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs rounded-full font-medium"
                              style={{ backgroundColor: colors.light, color: colors.secondary }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-1 md:col-span-4 space-y-6">
            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Education</h3>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-sm text-gray-900">{edu.degree}</h4>
                    <p className="text-sm" style={{ color: colors.secondary }}>{edu.field}</p>
                    <p className="text-xs text-gray-600">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{edu.year}</span>
                      {edu.gpa && <span className="text-xs font-medium">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Core Skills</h3>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: colors.primary }}></div>
                      <span className="text-sm text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Sections */}
            {data.certifications.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Certifications</h3>
                <div className="space-y-2">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="text-sm text-gray-700 bg-white p-2 rounded border-l-2" style={{ borderColor: colors.primary }}>
                      {cert}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.achievements.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Achievements</h3>
                <div className="space-y-2">
                  {data.achievements.map((achievement, index) => (
                    <div key={index} className="text-sm text-gray-700">• {achievement}</div>
                  ))}
                </div>
              </section>
            )}

            {data.languages.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>Languages</h3>
                <div className="space-y-1">
                  {data.languages.map((language, index) => (
                    <div key={index} className="text-sm text-gray-700">{language}</div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
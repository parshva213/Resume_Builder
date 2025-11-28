import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Award, Book, Star } from 'lucide-react';
import type { ResumeData } from '../ResumeBuilder';

interface TemplateProps {
  data: ResumeData;
  colorScheme: 'blue' | 'purple' | 'emerald' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal' | 'lime' | 'amber' | 'cyan' | 'violet' | string;
}

const colorSchemes = {
  blue: {
    primary: 'rgba(14, 165, 233, 0.95)',
    secondary: 'rgba(3, 105, 161, 0.9)',
    light: 'rgba(224, 242, 254, 0.5)',
    accent: 'rgba(14, 165, 233, 0.1)'
  },
  purple: {
    primary: 'rgba(139, 92, 246, 0.95)',
    secondary: 'rgba(124, 58, 237, 0.9)',
    light: 'rgba(243, 232, 255, 0.5)',
    accent: 'rgba(139, 92, 246, 0.1)'
  },
  emerald: {
    primary: 'rgba(16, 185, 129, 0.95)',
    secondary: 'rgba(5, 150, 105, 0.9)',
    light: 'rgba(209, 250, 229, 0.5)',
    accent: 'rgba(16, 185, 129, 0.1)'
  },
  orange: {
    primary: 'rgba(245, 158, 11, 0.95)',
    secondary: 'rgba(217, 119, 6, 0.9)',
    light: 'rgba(254, 243, 199, 0.5)',
    accent: 'rgba(245, 158, 11, 0.1)'
  },
  red: {
    primary: 'rgba(239, 68, 68, 0.95)',
    secondary: 'rgba(220, 38, 38, 0.9)',
    light: 'rgba(254, 226, 226, 0.5)',
    accent: 'rgba(239, 68, 68, 0.1)'
  },
  pink: {
    primary: 'rgba(236, 72, 153, 0.95)',
    secondary: 'rgba(219, 39, 119, 0.9)',
    light: 'rgba(252, 231, 243, 0.5)',
    accent: 'rgba(236, 72, 153, 0.1)'
  },
  indigo: {
    primary: 'rgba(99, 102, 241, 0.95)',
    secondary: 'rgba(79, 70, 229, 0.9)',
    light: 'rgba(224, 231, 255, 0.5)',
    accent: 'rgba(99, 102, 241, 0.1)'
  },
  teal: {
    primary: 'rgba(20, 184, 166, 0.95)',
    secondary: 'rgba(13, 148, 136, 0.9)',
    light: 'rgba(204, 251, 241, 0.5)',
    accent: 'rgba(20, 184, 166, 0.1)'
  },
  lime: {
    primary: 'rgba(132, 204, 22, 0.95)',
    secondary: 'rgba(101, 163, 13, 0.9)',
    light: 'rgba(236, 252, 203, 0.5)',
    accent: 'rgba(132, 204, 22, 0.1)'
  },
  amber: {
    primary: 'rgba(245, 158, 11, 0.95)',
    secondary: 'rgba(217, 119, 6, 0.9)',
    light: 'rgba(254, 243, 199, 0.5)',
    accent: 'rgba(245, 158, 11, 0.1)'
  },
  cyan: {
    primary: 'rgba(6, 182, 212, 0.95)',
    secondary: 'rgba(8, 145, 178, 0.9)',
    light: 'rgba(207, 250, 254, 0.5)',
    accent: 'rgba(6, 182, 212, 0.1)'
  },
  violet: {
    primary: 'rgba(139, 92, 246, 0.95)',
    secondary: 'rgba(124, 58, 237, 0.9)',
    light: 'rgba(243, 232, 255, 0.5)',
    accent: 'rgba(139, 92, 246, 0.1)'
  },
};

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, colorScheme }) => {
  let colors: any;
  if (
    typeof colorScheme === 'string' &&
    (colorScheme.startsWith('#') || colorScheme.startsWith('rgba'))
  ) {
    // For custom colors, create an rgba version with different opacities
    const rgbaColor = colorScheme.startsWith('rgba')
      ? colorScheme
      : `rgba(${parseInt(colorScheme.slice(1, 3), 16)}, ${parseInt(colorScheme.slice(3, 5), 16)}, ${parseInt(colorScheme.slice(5, 7), 16)}, 0.95)`;
    const secondaryColor = colorScheme.startsWith('rgba')
      ? colorScheme.replace(/[\d.]+\)$/, '0.9)')
      : `rgba(${parseInt(colorScheme.slice(1, 3), 16)}, ${parseInt(colorScheme.slice(3, 5), 16)}, ${parseInt(colorScheme.slice(5, 7), 16)}, 0.9)`;
    const lightColor = colorScheme.startsWith('rgba')
      ? colorScheme.replace(/[\d.]+\)$/, '0.1)')
      : `rgba(${parseInt(colorScheme.slice(1, 3), 16)}, ${parseInt(colorScheme.slice(3, 5), 16)}, ${parseInt(colorScheme.slice(5, 7), 16)}, 0.1)`;

    colors = {
      primary: rgbaColor,
      secondary: secondaryColor,
      light: '#fff',
      accent: lightColor
    };
  } else {
    colors = colorSchemes[colorScheme as keyof typeof colorSchemes];
  }

  // Create a gradient background for headers
  const headerBackground = `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`;

  return (
    <div className="bg-white text-gray-900 font-sans w-full md:w-[8.5in] ml-0" style={{
      minHeight: '11in',
      boxShadow: '0 0 20px rgba(0,0,0,0.1)'
    }}>
      {/* Header with Dynamic Gradient */}
      <header className="p-8 text-white relative overflow-hidden rounded-b-lg" style={{ background: headerBackground }}>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 tracking-tight">
            {data.personalInfo.name || 'Your Name'}
          </h1>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm backdrop-blur-sm rounded-lg bg-white/10 p-4">
            <div className="space-y-3">
              {data.personalInfo.email && (
                <div className="flex items-center hover:translate-x-1 transition-transform">
                  <Mail className="w-4 h-4 mr-2" />
                  {data.personalInfo.email}
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center hover:translate-x-1 transition-transform">
                  <Phone className="w-4 h-4 mr-2" />
                  {data.personalInfo.phone}
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center hover:translate-x-1 transition-transform">
                  <MapPin className="w-4 h-4 mr-2" />
                  {data.personalInfo.location}
                </div>
              )}
            </div>

            <div className="space-y-3">
              {data.personalInfo.linkedin && (
                <div className="flex items-center hover:translate-x-1 transition-transform">
                  <Linkedin className="w-4 h-4 mr-2" />
                  {data.personalInfo.linkedin}
                </div>
              )}
              {data.personalInfo.portfolio && (
                <div className="flex items-center hover:translate-x-1 transition-transform">
                  <Globe className="w-4 h-4 mr-2" />
                  {data.personalInfo.portfolio}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Creative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 bg-white transform translate-x-32 -translate-y-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 bg-white transform -translate-x-24 translate-y-24 blur-2xl"></div>
      </header>

      <div className="p-8">
        {/* Summary with creative styling */}
        {data.summary && (
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-1 rounded-full mr-4" style={{ background: headerBackground }}></div>
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: colors.primary }}>Profile</h2>
            </div>
            <p className="text-gray-700 leading-relaxed rounded-lg p-6" style={{
              backgroundColor: colors.accent,
              borderLeft: `4px solid ${colors.primary}`
            }}>
              {data.summary}
            </p>
          </section>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Column */}
          <div className="col-span-1 md:col-span-8 space-y-8">
            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 rounded-full mr-4" style={{ background: headerBackground }}></div>
                  <h2 className="text-2xl font-bold tracking-tight" style={{ color: colors.primary }}>Experience</h2>
                </div>
                {data.experience.map((exp, index) => (
                  <div key={exp.id} className="mb-6 relative pl-8">
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                    <div className="absolute left-2 top-6 w-0.5 h-full" style={{ backgroundColor: colors.accent }}></div>

                    <div className="group bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
                      style={{ borderLeft: `4px solid ${colors.primary}` }}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">{exp.position}</h3>
                          <p className="font-medium text-base" style={{ color: colors.secondary }}>{exp.company}</p>
                        </div>
                        <span className="text-sm px-3 py-1 rounded-full"
                          style={{ backgroundColor: colors.accent, color: colors.primary }}>
                          {exp.duration}
                        </span>
                      </div>
                      {exp.responsibilities.length > 0 && (
                        <ul className="space-y-2 text-gray-700">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="flex items-start group-hover:translate-x-1 transition-transform">
                              <span className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0"
                                style={{ backgroundColor: colors.primary }}></span>
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

            {/* Projects with hover effects */}
            {data.projects.length > 0 && (
              <section>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 rounded-full mr-4" style={{ background: headerBackground }}></div>
                  <h2 className="text-2xl font-bold tracking-tight" style={{ color: colors.primary }}>Featured Projects</h2>
                </div>
                <div className="grid gap-6">
                  {data.projects.map((project) => (
                    <div key={project.id}
                      className="group relative bg-white rounded-lg p-6 transition-all duration-300 hover:shadow-lg"
                      style={{
                        backgroundColor: colors.accent,
                        borderLeft: `4px solid ${colors.primary}`
                      }}>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-xl text-gray-900 group-hover:translate-x-1 transition-transform">
                          {project.title}
                        </h3>
                        {project.link && (
                          <ExternalLink className="w-5 h-5" style={{ color: colors.secondary }} />
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm rounded-full font-medium transition-colors"
                              style={{
                                backgroundColor: colors.light,
                                color: colors.primary
                              }}
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

          {/* Sidebar */}
          <div className="col-span-1 md:col-span-4 space-y-8">
            {/* Education */}
            {data.education.length > 0 && (
              <section className="bg-white rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Book className="w-5 h-5 mr-2" />
                  Education
                </h3>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4 last:mb-0">
                    <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                    <p className="text-sm font-medium" style={{ color: colors.secondary }}>{edu.field}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{edu.year}</span>
                      {edu.gpa && <span className="text-xs font-medium">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Skills with visual indicators */}
            {data.skills.length > 0 && (
              <section className="bg-white rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Star className="w-5 h-5 mr-2" />
                  Core Skills
                </h3>
                <div className="space-y-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="w-2 h-2 rounded-full mr-3 group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: colors.primary }}></div>
                      <span className="text-gray-700 group-hover:translate-x-1 transition-transform">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <section className="bg-white rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: colors.primary }}>
                  <Award className="w-5 h-5 mr-2" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="text-gray-700 bg-white/50 p-3 rounded-lg hover:translate-x-1 transition-transform">
                      {cert}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional sections with hover animations */}
            {data.achievements.length > 0 && (
              <section className="bg-white rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Achievements</h3>
                <div className="space-y-3">
                  {data.achievements.map((achievement, index) => (
                    <div key={index} className="text-gray-700 flex items-start group">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 mr-2 flex-shrink-0 group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: colors.primary }}></span>
                      <span className="group-hover:translate-x-1 transition-transform">{achievement}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.languages.length > 0 && (
              <section className="bg-white rounded-lg p-6" style={{ backgroundColor: colors.accent }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Languages</h3>
                <div className="space-y-2">
                  {data.languages.map((language, index) => (
                    <div key={index}
                      className="text-gray-700 hover:translate-x-1 transition-transform flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: colors.primary }}></span>
                      {language}
                    </div>
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
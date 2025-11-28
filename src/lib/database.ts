import { supabase } from './supabase'

// Types for your database tables
interface ResumeContent {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    linkedin: string
    portfolio: string
    photo?: string
  }
  summary: string
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    year: string
    gpa?: string
  }>
  skills: string[]
  projects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    link?: string
  }>
  experience: Array<{
    id: string
    position: string
    company: string
    duration: string
    responsibilities: string[]
  }>
  certifications: string[]
  achievements: string[]
  languages: string[]
}

interface Resume {
  id: number
  created_at: string
  user_id: string
  title: string
  content: ResumeContent
}

export const DatabaseService = {
  // Fetch all resumes for a user
  async getResumes(userId: string) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Resume[]
  },

  // Get a single resume by ID
  async getResumeById(id: number) {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Resume
  },

  // Convenience: just the structured resume content (for preview)
  async getResumeContentById(id: number) {
    const { data, error } = await supabase
      .from('resumes')
      .select('content')
      .eq('id', id)
      .single()

    if (error) throw error
    return (data as { content: ResumeContent }).content
  },

  // Create a new resume
  async createResume(userId: string, title: string, content: ResumeContent) {
    const { data, error } = await supabase
      .from('resumes')
      .insert([
        {
          user_id: userId,
          title,
          content
        }
      ])
      .select()
      .single()

    if (error) throw error
    return data as Resume
  },

  // Update an existing resume
  async updateResume(id: number, updates: Partial<Omit<Resume, 'id'>>) {
    const { data, error } = await supabase
      .from('resumes')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Resume
  },

  // Delete a resume
  async deleteResume(id: number) {
    const { error } = await supabase
      .from('resumes')
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }
}
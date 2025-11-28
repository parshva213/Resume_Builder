/**
 * Google AI API Integration
 * Provides a reusable function to interact with Google's AI services
 */

export interface AIResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
    finishReason: string;
    index: number;
    safetyRatings: Array<{
      category: string;
      probability: string;
    }>;
  }>;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

export interface AIError {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

/**
 * Fetches AI response from Google AI API
 * @param prompt - The text prompt to send to the AI
 * @param model - The AI model to use (default: 'gemini-1.5-flash')
 * @returns Promise<AIResponse> - The structured JSON response
 * @throws Error - If the API request fails
 */
export async function fetchAIResponse(
  prompt: string,
  model: string = 'gemini-1.5-flash'
): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Google AI API key is not configured. Please set VITE_GOOGLE_AI_API_KEY in your environment variables.');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE"
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData: AIError = await response.json();
      throw new Error(`API Error ${errorData.error.code}: ${errorData.error.message}`);
    }

    const data: AIResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated from AI');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`AI API request failed: ${error.message}`);
    }
    throw new Error('AI API request failed: Unknown error occurred');
  }
}

/**
 * Extracts the text content from AI response
 * @param response - The AI response object
 * @returns string - The extracted text content
 */
export function extractAIText(response: AIResponse): string {
  if (!response.candidates || response.candidates.length === 0) {
    return '';
  }

  const candidate = response.candidates[0];
  if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
    return '';
  }

  return candidate.content.parts[0].text || '';
}

/**
 * Helper function to generate resume content using AI
 * @param prompt - The specific prompt for resume content generation
 * @returns Promise<string> - The generated text content
 */
export async function generateResumeContent(prompt: string): Promise<string> {
  try {
    const response = await fetchAIResponse(prompt);
    return extractAIText(response);
  } catch (error) {
    console.error('Failed to generate resume content:', error);
    throw error;
  }
}

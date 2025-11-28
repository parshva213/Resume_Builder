// import React, { useState } from 'react';
// import { ResumeForm } from './ResumeForm';
// import { ResumePreview } from './ResumePreview';
// import { TemplateSelector } from './TemplateSelector';
// import { Header } from './Header';
// import { Button } from './ui/button';
// import { Download, Eye, EyeOff } from 'lucide-react';

// export interface ResumeData {
//   personalInfo: {
//     name: string;
//     email: string;
//     phone: string;
//     location: string;
//     linkedin: string;
//     portfolio: string;
//     photo?: string;
//   };
//   summary: string;
//   education: Array<{
//     id: string;
//     institution: string;
//     degree: string;
//     field: string;
//     year: string;
//     gpa?: string;
//   }>;
//   skills: string[];
//   projects: Array<{
//     id: string;
//     title: string;
//     description: string;
//     technologies: string[];
//     link?: string;
//   }>;
//   experience: Array<{
//     id: string;
//     position: string;
//     company: string;
//     duration: string;
//     responsibilities: string[];
//   }>;
//   certifications: string[];
//   achievements: string[];
//   languages: string[];
// }

// const initialResumeData: ResumeData = {
//   personalInfo: {
//     name: '',
//     email: '',
//     phone: '',
//     location: '',
//     linkedin: '',
//     portfolio: '',
//   },
//   summary: '',
//   education: [],
//   skills: [],
//   projects: [],
//   experience: [],
//   certifications: [],
//   achievements: [],
//   languages: [],
// };

// export const ResumeBuilder: React.FC = () => {
//   const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
//   const [selectedTemplate, setSelectedTemplate] = useState<'professional' | 'modern' | 'creative'>('professional');
//   const [selectedColor, setSelectedColor] = useState<'blue' | 'purple' | 'emerald' | 'orange'>('blue');
//   const [showPreview, setShowPreview] = useState(true);

//   const handleDataChange = (newData: Partial<ResumeData>) => {
//     setResumeData(prev => ({ ...prev, ...newData }));
//   };

//   const handleDownloadPDF = () => {
//     // PDF download functionality will be implemented here
//     console.log('Downloading PDF...');
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         {/* Template Selector */}
//         <div className="mb-8 animate-fade-in">
//           <TemplateSelector
//             selectedTemplate={selectedTemplate}
//             selectedColor={selectedColor}
//             onTemplateChange={setSelectedTemplate}
//             onColorChange={setSelectedColor}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row gap-8 w-full h-full">
//           {/* Form Section */}
//           <div className="flex-1 min-w-0 max-w-full lg:w-1/2 space-y-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold text-gradient">Resume Information</h2>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setShowPreview(!showPreview)}
//                 className="button-3d"
//               >
//                 {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
//                 {showPreview ? 'Hide Preview' : 'Show Preview'}
//               </Button>
//             </div>
//             <ResumeForm
//               data={resumeData}
//               onChange={handleDataChange}
//             />
//             {/* Language box and download button below */}
//             <div className="flex flex-col gap-4 mt-6">
//               {/* Language box placeholder, replace with actual language selector if exists */}
//               <div className="w-full">
//                 {/* Language selector component or box here */}
//               </div>
//               <Button
//                 onClick={handleDownloadPDF}
//                 className="button-3d w-full"
//                 variant="hero"
//               >
//                 <Download className="w-4 h-4 mr-2" />
//                 Download PDF
//               </Button>
//             </div>
//           </div>

//           {/* Preview Section */}
//           {showPreview && (
//             <div className="flex-1 min-w-0 max-w-full lg:w-1/2 flex flex-col items-stretch justify-start">
//               <div className="card-3d p-4 w-full">
//                 <h2 className="text-xl font-bold mb-4 text-gradient">Live Preview</h2>
//                 <div className="preview-wrapper">
//                   <div className="preview-inner">
//                     <ResumePreview
//                       data={resumeData}
//                       template={selectedTemplate}
//                       colorScheme={selectedColor}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState } from 'react';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from './TemplateSelector';
import { Header } from './Header';
import { AIAssistant } from './AIAssistant';
import { Button } from './ui/button';
import { Download, Eye, EyeOff, Bot } from 'lucide-react';

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string;
    photo?: string;
  };
  summary: string;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  experience: Array<{
    id: string;
    position: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }>;
  certifications: string[];
  achievements: string[];
  languages: string[];
}

type ColorScheme = 'blue' | 'purple' | 'emerald' | 'orange' | 'red' | 'pink' | 'indigo' | 'teal' | 'lime' | 'amber' | 'cyan' | 'violet';

const initialResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
  },
  summary: '',
  education: [],
  skills: [],
  projects: [],
  experience: [],
  certifications: [],
  achievements: [],
  languages: [],
};

export const ResumeBuilder: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<'professional' | 'modern' | 'creative'>('professional');
  const [selectedColor, setSelectedColor] = useState<ColorScheme>('blue');
  const [showPreview, setShowPreview] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleDataChange = (newData: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...newData }));
  };

  const handleDownloadPDF = async () => {
    try {
      const apiKey = import.meta.env.VITE_PDFLAYER_KEY;

      // Check if API key is available
      if (!apiKey) {
        console.warn('PDF API key not found, using browser print as fallback');
        handlePrintFallback();
        return;
      }

      const preview = document.querySelector('.resume-preview') as HTMLElement | null;
      if (!preview) {
        console.error('Preview element not found');
        alert('Preview not found. Please make sure the resume preview is visible.');
        return;
      }

      console.log('Generating PDF with pdflayer API...');

      const documentHtml = `<!doctype html><html><head><meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @page { size: A4; margin: 10mm; }
          html, body { background: #ffffff; }
          .resume-preview { min-height: 11in; width: 8.5in; }
        </style>
      </head><body>${preview.outerHTML}</body></html>`;

      const res = await fetch(`https://api.pdflayer.com/api/convert?access_key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_html: documentHtml,
          page_size: 'A4',
          margin_top: 10,
          margin_right: 10,
          margin_bottom: 10,
          margin_left: 10
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('PDF API error', errorText);
        console.log('Falling back to browser print...');
        handlePrintFallback();
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      console.log('PDF downloaded successfully');
    } catch (err) {
      console.error('Failed to download PDF', err);
      console.log('Falling back to browser print...');
      handlePrintFallback();
    }
  };

  const handlePrintFallback = () => {
    const preview = document.querySelector('.resume-preview') as HTMLElement | null;
    if (!preview) {
      alert('Preview not found. Please make sure the resume preview is visible.');
      return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to print the resume.');
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - Print</title>
          <meta charset="utf-8">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { size: A4; margin: 10mm; }
            body { margin: 0; padding: 0; }
            .resume-preview { 
              min-height: 11in; 
              width: 8.5in; 
              margin: 0 auto;
              background: white;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          ${preview.outerHTML}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Template Selector */}
        <div className="mb-8 animate-fade-in">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            selectedColor={selectedColor}
            onTemplateChange={setSelectedTemplate}
            onColorChange={setSelectedColor}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gradient">Resume Information</h2>
              <div className="flex items-center gap-4">
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden button-3d"
                >
                  {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showPreview ? 'Hide Preview' : 'Show Preview'}
                </Button> */}
                <Button
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  variant="outline"
                  className="button-3d mr-2"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="button-3d"
                  variant="hero"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>

            <ResumeForm
              data={resumeData}
              onChange={handleDataChange}
            />
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <div className="card-3d p-6">
                <h2 className="text-xl font-bold mb-4 text-gradient">Live Preview</h2>
                <div className="transform scale-75 origin-top-left lg:scale-90 xl:scale-100">
                  <ResumePreview
                    data={resumeData}
                    template={selectedTemplate}
                    colorScheme={selectedColor}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <AIAssistant />
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setShowAIAssistant(false)}
                variant="outline"
                className="button-3d"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
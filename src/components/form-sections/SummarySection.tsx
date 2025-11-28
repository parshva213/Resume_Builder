import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { FileText } from 'lucide-react';

interface SummarySectionProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({ data, onChange }) => {
  return (
    <Card className="card-3d">
      <CardHeader>
        <CardTitle className="flex items-center text-gradient">
          <FileText className="w-5 h-5 mr-2 text-accent-purple" />
          Professional Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary" className="text-sm font-medium">
            Write a brief summary of your professional background and goals
          </Label>
          <Textarea
            id="summary"
            placeholder="Experienced software developer with 3+ years of experience in building scalable web applications. Passionate about creating user-friendly interfaces and solving complex problems..."
            value={data}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[120px] input-3d"
            rows={5}
          />
        </div>
      </CardContent>
    </Card>
  );
};
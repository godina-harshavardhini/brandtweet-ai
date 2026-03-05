import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Building2, Target, MessageSquare, Package, Users, Link2, SlidersHorizontal } from 'lucide-react';
import type { BrandFormData } from '@/types';
import { campaignObjectives } from '@/types';

interface InputFormProps {
  onSubmit: (data: BrandFormData) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState<BrandFormData>({
    brandName: '',
    industry: '',
    campaignObjective: 'engagement',
    brandPersonality: '',
    products: '',
    targetAudience: '',
    websiteLink: '',
    tonePreference: 'balanced',
  });

  const [showOptional, setShowOptional] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.brandName && formData.industry) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof BrandFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isValid = formData.brandName.trim() && formData.industry.trim();

  return (
    <section id="generate" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tell Us About Your Brand
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fill in the details below and our AI will analyze your brand voice to generate perfect tweets.
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  Brand Details
                </CardTitle>
                <CardDescription className="mt-2">
                  Required fields are marked with <span className="text-red-500">*</span>
                </CardDescription>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                AI-Powered
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Required Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brand Name */}
                <div className="space-y-2">
                  <Label htmlFor="brandName" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Brand Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="brandName"
                    placeholder="e.g., Acme Corp"
                    value={formData.brandName}
                    onChange={(e) => updateField('brandName', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    Industry / Category <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="industry"
                    placeholder="e.g., SaaS, Fashion, Food"
                    value={formData.industry}
                    onChange={(e) => updateField('industry', e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
              </div>

              {/* Campaign Objective */}
              <div className="space-y-2">
                <Label htmlFor="objective" className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-gray-500" />
                  Campaign Objective <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.campaignObjective}
                  onValueChange={(value) => updateField('campaignObjective', value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your campaign objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignObjectives.map((obj) => (
                      <SelectItem key={obj.value} value={obj.value}>
                        {obj.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tone Preference Toggle */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  Tone Preference
                </Label>
                <div className="flex flex-wrap gap-2">
                  {(['balanced', 'playful', 'bold', 'minimal'] as const).map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => updateField('tonePreference', tone)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.tonePreference === tone
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tone.charAt(0).toUpperCase() + tone.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Fields Toggle */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                >
                  {showOptional ? 'Hide' : 'Show'} optional fields for better results
                  <span className="transform transition-transform inline-block ml-1">
                    {showOptional ? '↑' : '↓'}
                  </span>
                </button>
              </div>

              {/* Optional Fields */}
              {showOptional && (
                <div className="space-y-6 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Brand Personality */}
                    <div className="space-y-2">
                      <Label htmlFor="personality" className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        Brand Personality
                      </Label>
                      <Textarea
                        id="personality"
                        placeholder="e.g., Witty, bold, premium, playful, minimal..."
                        value={formData.brandPersonality}
                        onChange={(e) => updateField('brandPersonality', e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>

                    {/* Products/Services */}
                    <div className="space-y-2">
                      <Label htmlFor="products" className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        Products/Services
                      </Label>
                      <Textarea
                        id="products"
                        placeholder="Describe what you offer..."
                        value={formData.products}
                        onChange={(e) => updateField('products', e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Target Audience */}
                    <div className="space-y-2">
                      <Label htmlFor="audience" className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        Target Audience
                      </Label>
                      <Textarea
                        id="audience"
                        placeholder="e.g., Tech-savvy millennials, B2B decision makers..."
                        value={formData.targetAudience}
                        onChange={(e) => updateField('targetAudience', e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>

                    {/* Website Link */}
                    <div className="space-y-2">
                      <Label htmlFor="website" className="flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-gray-500" />
                        Website or Social Link
                      </Label>
                      <Input
                        id="website"
                        placeholder="https://..."
                        value={formData.websiteLink}
                        onChange={(e) => updateField('websiteLink', e.target.value)}
                        className="h-12"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={!isValid || isLoading}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing Brand & Generating Tweets...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Analyze Brand & Generate Tweets
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

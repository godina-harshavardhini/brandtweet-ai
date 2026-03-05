import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Check, 
  Copy, 
  RefreshCw, 
  Twitter, 
  MessageCircle, 
  TrendingUp, 
  Laugh, 
  Lightbulb,
  Download
} from 'lucide-react';
import type { GenerationResult, Tweet } from '@/types';
import { toast } from 'sonner';

interface OutputSectionProps {
  result: GenerationResult | null;
  onRegenerate: () => void;
  isLoading: boolean;
}

const styleIcons = {
  conversational: MessageCircle,
  promotional: TrendingUp,
  witty: Laugh,
  informative: Lightbulb,
};

const styleLabels = {
  conversational: 'Conversational',
  promotional: 'Promotional',
  witty: 'Witty/Meme',
  informative: 'Informative',
};

export function OutputSection({ result, onRegenerate, isLoading }: OutputSectionProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!result) return null;

  const handleCopy = async (tweet: Tweet) => {
    try {
      await navigator.clipboard.writeText(tweet.text);
      setCopiedId(tweet.id);
      toast.success('Copied!', {
        description: 'Tweet copied to clipboard',
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy', {
        description: 'Please try again',
      });
    }
  };

  const handleCopyAll = async () => {
    try {
      const allTweets = result.tweets.map((t, i) => `${i + 1}. ${t.text}`).join('\n\n');
      await navigator.clipboard.writeText(allTweets);
      toast.success('All tweets copied!', {
        description: 'All 10 tweets copied to clipboard',
      });
    } catch (err) {
      toast.error('Failed to copy', {
        description: 'Please try again',
      });
    }
  };

  const handleDownload = () => {
    const content = result.tweets.map((t, i) => `${i + 1}. ${t.text}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-tweets.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded!', {
      description: 'Tweets saved as TXT file',
    });
  };

  const groupedTweets = {
    all: result.tweets,
    conversational: result.tweets.filter(t => t.style === 'conversational'),
    promotional: result.tweets.filter(t => t.style === 'promotional'),
    witty: result.tweets.filter(t => t.style === 'witty'),
    informative: result.tweets.filter(t => t.style === 'informative'),
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 mb-6">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Generation Complete</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Brand Voice Analysis & Tweets
          </h2>
        </div>

        {/* Brand Voice Summary Card */}
        <Card className="mb-10 shadow-lg border-0 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <CardTitle className="text-white flex items-center gap-2 text-lg">
              <Twitter className="w-5 h-5" />
              Brand Voice Summary
            </CardTitle>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Tone</p>
                <p className="font-semibold text-gray-900">{result.brandVoiceSummary.tone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Target Audience</p>
                <p className="font-semibold text-gray-900">{result.brandVoiceSummary.targetAudience}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Content Themes</p>
                <p className="font-semibold text-gray-900">{result.brandVoiceSummary.contentThemes}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Communication Style</p>
                <p className="font-semibold text-gray-900">{result.brandVoiceSummary.communicationStyle}</p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500 mb-3">Key Characteristics</p>
              <ul className="space-y-2">
                {result.brandVoiceSummary.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-blue-600 mt-1">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant="outline"
            onClick={handleCopyAll}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy All
          </Button>
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download TXT
          </Button>
          <Button
            variant="outline"
            onClick={onRegenerate}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Regenerate
          </Button>
        </div>

        {/* Tweets Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all">All (10)</TabsTrigger>
            <TabsTrigger value="conversational">Chat (3)</TabsTrigger>
            <TabsTrigger value="promotional">Promo (2)</TabsTrigger>
            <TabsTrigger value="witty">Witty (2)</TabsTrigger>
            <TabsTrigger value="informative">Info (3)</TabsTrigger>
          </TabsList>

          {Object.entries(groupedTweets).map(([key, tweets]) => (
            <TabsContent key={key} value={key} className="space-y-4">
              {tweets.map((tweet) => {
                const StyleIcon = styleIcons[tweet.style];
                return (
                  <Card 
                    key={tweet.id} 
                    className="group hover:shadow-md transition-shadow border-gray-200"
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Tweet Icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                          <StyleIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        
                        {/* Tweet Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {styleLabels[tweet.style]}
                            </Badge>
                            <span className={`text-xs ${
                              tweet.characterCount > 280 ? 'text-red-500' : 'text-gray-500'
                            }`}>
                              {tweet.characterCount}/280
                            </span>
                          </div>
                          <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                            {tweet.text}
                          </p>
                        </div>
                        
                        {/* Copy Button */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(tweet)}
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedId === tweet.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

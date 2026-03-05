import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { InputForm } from '@/sections/InputForm';
import { OutputSection } from '@/sections/OutputSection';
import { HowItWorks } from '@/sections/HowItWorks';
import { Footer } from '@/sections/Footer';
import type { BrandFormData, GenerationResult } from '@/types';
import { generateTweets } from '@/services/api';
import { toast } from 'sonner';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const scrollToForm = () => {
    const formElement = document.getElementById('generate');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (formData: BrandFormData) => {
    setIsLoading(true);
    try {
      const data = await generateTweets(formData);
      setResult(data);
      toast.success('Tweets generated successfully!', {
        description: 'Your brand voice analysis and 10 tweets are ready.',
      });
      // Scroll to results after a short delay
      setTimeout(() => {
        const outputSection = document.getElementById('output');
        if (outputSection) {
          outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      toast.error('Failed to generate tweets', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    // Get the form data from the current result and regenerate
    const formElement = document.getElementById('generate');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
      // The user can click submit again to regenerate
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Navigation />
      
      <main>
        <Hero onGenerateClick={scrollToForm} />
        <div id="generate">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div id="output">
          <OutputSection 
            result={result} 
            onRegenerate={handleRegenerate}
            isLoading={isLoading}
          />
        </div>
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  MessageSquare, 
  Zap, 
  Code2, 
  Settings, 
  Workflow,
  ArrowRight
} from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Input Your Brand Details',
    description: 'Share your brand name, industry, campaign objective, and optional details like personality traits and target audience.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Brain,
    title: 'AI Analyzes Your Voice',
    description: 'Our advanced AI examines your inputs to infer tone, communication style, content themes, and target audience characteristics.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'Generate 10 On-Brand Tweets',
    description: 'Receive 10 carefully crafted tweets in various styles: conversational, promotional, witty, and informative.',
    color: 'from-indigo-500 to-indigo-600',
  },
];

const techStack = [
  {
    icon: Code2,
    title: 'OpenAI GPT-4',
    description: 'Powered by state-of-the-art language models for natural, engaging content generation.',
  },
  {
    icon: Settings,
    title: 'Prompt Engineering',
    description: 'Carefully crafted prompts that ensure consistent brand voice and platform-native content.',
  },
  {
    icon: Workflow,
    title: 'Smart Categorization',
    description: 'Automatic tweet classification into conversational, promotional, witty, and informative styles.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From brand analysis to tweet generation in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mt-2`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {/* Connector Arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              The Technology Behind BrandTweet AI
            </h3>
            <p className="text-gray-600">
              Built with modern tools and best practices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                  <tech.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {tech.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Engineering Info */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-900 text-gray-300 rounded-lg p-4 font-mono text-sm text-left max-w-2xl overflow-x-auto">
            <p className="text-gray-500 mb-2"># Example AI Prompt Structure</p>
            <p>You are a brand strategist and social media copywriter.</p>
            <p>Based on the following inputs:</p>
            <p className="text-blue-400">Brand Name: {'{brand_name}'}</p>
            <p className="text-blue-400">Industry: {'{industry}'}</p>
            <p className="text-blue-400">Campaign Objective: {'{objective}'}</p>
            <p className="mt-2">Your task:</p>
            <p>1. Infer the brand voice (tone, audience, themes)</p>
            <p>2. Generate 10 tweets matching that voice</p>
            <p className="mt-2 text-green-400"># Output: Brand Voice Summary + 10 Tweets</p>
          </div>
        </div>
      </div>
    </section>
  );
}

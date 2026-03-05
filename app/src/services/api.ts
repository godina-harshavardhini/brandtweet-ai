import type { BrandFormData, GenerationResult } from '@/types';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function generateTweets(data: BrandFormData): Promise<GenerationResult> {
  // For demo purposes, simulate API call with mock data
  // In production, replace this with actual API call to Django backend
  
  await new Promise(resolve => setTimeout(resolve, 2500)); // Simulate loading
  
  // Mock response for demonstration
  const mockResult: GenerationResult = {
    brandVoiceSummary: {
      tone: inferTone(data),
      targetAudience: data.targetAudience || 'General audience interested in ' + data.industry,
      contentThemes: `Innovation, quality, and customer-centric solutions in ${data.industry}`,
      communicationStyle: data.brandPersonality?.toLowerCase().includes('witty') ? 'Conversational with clever wordplay' : 'Professional yet approachable',
      bullets: [
        `Tone: ${inferTone(data)} - ${getToneDescription(data)}`,
        `Target: ${data.targetAudience || 'Professionals and enthusiasts in ' + data.industry}`,
        `Themes: Innovation, authenticity, and value-driven content`,
        `Style: ${data.tonePreference === 'playful' ? 'Light-hearted with strategic emoji use' : data.tonePreference === 'bold' ? 'Direct and confident statements' : 'Clean, professional communication'}`,
      ]
    },
    tweets: generateMockTweets(data)
  };
  
  return mockResult;
  
  // Actual API call (uncomment when backend is ready):
  /*
  const response = await fetch(`${API_BASE_URL}/generate-tweets/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate tweets');
  }
  
  return response.json();
  */
}

function inferTone(data: BrandFormData): string {
  const personality = data.brandPersonality?.toLowerCase() || '';
  if (personality.includes('witty') || personality.includes('funny')) return 'Witty & Clever';
  if (personality.includes('bold') || personality.includes('strong')) return 'Bold & Confident';
  if (personality.includes('playful') || personality.includes('fun')) return 'Playful & Friendly';
  if (personality.includes('premium') || personality.includes('luxury')) return 'Premium & Sophisticated';
  if (personality.includes('minimal')) return 'Minimal & Clean';
  if (data.tonePreference === 'playful') return 'Playful & Engaging';
  if (data.tonePreference === 'bold') return 'Bold & Direct';
  if (data.tonePreference === 'minimal') return 'Minimal & Concise';
  return 'Professional & Approachable';
}

function getToneDescription(data: BrandFormData): string {
  const tone = inferTone(data);
  const descriptions: Record<string, string> = {
    'Witty & Clever': 'Uses humor and wordplay to engage',
    'Bold & Confident': 'Makes strong statements with conviction',
    'Playful & Friendly': 'Warm, approachable, and fun-loving',
    'Premium & Sophisticated': 'Elegant, refined, and exclusive',
    'Minimal & Clean': 'Simple, direct, and clutter-free',
    'Playful & Engaging': 'Interactive and entertaining',
    'Bold & Direct': 'Straight to the point, no fluff',
    'Minimal & Concise': 'Every word counts',
    'Professional & Approachable': 'Expert but relatable'
  };
  return descriptions[tone] || 'Balanced and versatile';
}

function generateMockTweets(data: BrandFormData): { id: number; text: string; style: 'conversational' | 'promotional' | 'witty' | 'informative'; characterCount: number }[] {
  const brand = data.brandName;
  const industry = data.industry;
  // const objective = data.campaignObjective;
  const products = data.products || 'our solutions';
  
  const isPlayful = data.tonePreference === 'playful';
  const isBold = data.tonePreference === 'bold';
  const isMinimal = data.tonePreference === 'minimal';
  
  // Conversational tweets (3)
  const conversationalTweets = [
    {
      id: 1,
      text: isPlayful 
        ? `What's everyone working on this week? ${brand} is here to make your ${industry} journey a little brighter ✨ Share your wins below!`
        : isBold
        ? `Let's cut through the noise. ${brand} delivers ${industry} solutions that actually work. What's your biggest challenge right now?`
        : `We love hearing from our community! What's one thing you'd like to see from ${brand} in the ${industry} space? Drop your thoughts 👇`,
      style: 'conversational' as const,
      characterCount: 0
    },
    {
      id: 2,
      text: isPlayful
        ? `Monday mood: Ready to conquer the ${industry} world with ${brand} ☕ Who's with us?`
        : isBold
        ? `The ${industry} industry is crowded. ${brand} stands out. Here's why →`
        : `Sometimes the best ideas come from casual conversations. What's on your mind today? We'd love to chat 💬`,
      style: 'conversational' as const,
      characterCount: 0
    },
    {
      id: 3,
      text: isPlayful
        ? `Real talk: ${industry} can be overwhelming. But with ${brand}, you've got a partner in your corner 🙌`
        : isMinimal
        ? `Question for you: What matters most in ${industry}?`
        : `We asked our team what makes ${brand} special. Their answers? The people we serve. Thank you for being part of our story 🙏`,
      style: 'conversational' as const,
      characterCount: 0
    }
  ];
  
  // Promotional tweets (2)
  const promotionalTweets = [
    {
      id: 4,
      text: isBold
        ? `Stop settling for mediocre ${industry} solutions. ${brand} is built different. Experience the upgrade today →`
        : isMinimal
        ? `${brand}. ${industry} redefined.`
        : `Ready to elevate your ${industry} game? ${brand} has everything you need to succeed. Discover ${products} today 🚀`,
      style: 'promotional' as const,
      characterCount: 0
    },
    {
      id: 5,
      text: isPlayful
        ? `PSA: Your ${industry} experience is about to get a major upgrade 🎉 Meet ${brand} — where innovation meets fun!`
        : isBold
        ? `The best ${industry} solution on the market. Period. ${brand}.`
        : `Transform your approach to ${industry} with ${brand}. Trusted by industry leaders. Loved by teams everywhere 💼`,
      style: 'promotional' as const,
      characterCount: 0
    }
  ];
  
  // Witty tweets (2)
  const wittyTweets = [
    {
      id: 6,
      text: isPlayful
        ? `My ${industry} strategy before ${brand}: 🤷‍♂️ My ${industry} strategy after ${brand}: 🎯💪✨`
        : isBold
        ? `They said it couldn't be done. We did it anyway. ${brand} — breaking ${industry} norms since day one.`
        : `*Checks calendar* Yep, it's time to upgrade your ${industry} setup. ${brand} makes it painless (and maybe even fun) 😎`,
      style: 'witty' as const,
      characterCount: 0
    },
    {
      id: 7,
      text: isMinimal
        ? `${industry} is complicated. ${brand} is not.`
        : `Roses are red, violets are blue, ${brand} is here, and your ${industry} goals are too 🌹 (Okay, we'll stick to ${industry}, not poetry)`,
      style: 'witty' as const,
      characterCount: 0
    }
  ];
  
  // Informative tweets (3)
  const informativeTweets = [
    {
      id: 8,
      text: isBold
        ? `3 facts about ${industry}: 1. It's evolving fast. 2. Most solutions are outdated. 3. ${brand} is ahead of the curve. Stay informed. Stay ahead.`
        : `Did you know? 73% of ${industry} professionals say the right tools make all the difference. ${brand} is designed to be that difference 📊`,
      style: 'informative' as const,
      characterCount: 0
    },
    {
      id: 9,
      text: isMinimal
        ? `Tip: Focus on what matters in ${industry}. Let ${brand} handle the rest.`
        : `Pro tip for ${industry} success: Consistency beats perfection. Small improvements daily lead to massive results. ${brand} helps you stay on track 📈`,
      style: 'informative' as const,
      characterCount: 0
    },
    {
      id: 10,
      text: isPlayful
        ? `Quick ${industry} hack: Start your day with clear priorities. Use ${brand} to organize, optimize, and absolutely crush your goals 🎯`
        : `The secret to winning in ${industry}? Understanding your audience. ${brand} gives you the insights you need to make smarter decisions 💡`,
      style: 'informative' as const,
      characterCount: 0
    }
  ];
  
  const allTweets = [...conversationalTweets, ...promotionalTweets, ...wittyTweets, ...informativeTweets];
  
  // Calculate character counts
  return allTweets.map(tweet => ({
    ...tweet,
    characterCount: tweet.text.length
  }));
}

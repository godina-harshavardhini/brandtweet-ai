import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className={`font-bold text-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-gray-900'
            }`}>
              BrandTweet AI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('generate')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              Generate
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-gray-700'
              }`}
            >
              How It Works
            </button>
            <Button 
              size="sm"
              onClick={() => scrollToSection('generate')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection('generate')}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Generate
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                How It Works
              </button>
              <div className="px-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  onClick={() => scrollToSection('generate')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

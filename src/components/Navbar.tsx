import { useState } from 'react';
import { Film, Search, User, Menu, X, Upload, Home, BookOpen, Users } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cinematic-dark/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 group">
              <Film className="w-8 h-8 text-cinematic-accent group-hover:text-cinematic-gold transition-colors" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">
                CineTaste
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="flex items-center space-x-1 text-gray-300 hover:text-cinematic-accent transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a href="/browse" className="flex items-center space-x-1 text-gray-300 hover:text-cinematic-accent transition-colors">
                <BookOpen className="w-4 h-4" />
                <span>Browse</span>
              </a>
              <a href="/scene-to-recipe" className="flex items-center space-x-1 text-gray-300 hover:text-cinematic-accent transition-colors">
                <Upload className="w-4 h-4" />
                <span>AI Scene</span>
              </a>
              <a href="/community" className="flex items-center space-x-1 text-gray-300 hover:text-cinematic-accent transition-colors">
                <Users className="w-4 h-4" />
                <span>Community</span>
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-cinematic-accent transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <a href="/login" className="text-gray-300 hover:text-cinematic-accent transition-colors">
              Login
            </a>
            <a href="/register" className="btn-primary text-sm">
              Sign Up
            </a>
            <button className="p-2 rounded-full bg-cinematic-gray-light hover:bg-cinematic-gray transition-colors">
              <User className="w-5 h-5 text-gray-300" />
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-cinematic-accent transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-cinematic-gray border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <a href="/" className="block text-gray-300 hover:text-cinematic-accent transition-colors">Home</a>
            <a href="/browse" className="block text-gray-300 hover:text-cinematic-accent transition-colors">Browse Recipes</a>
            <a href="/scene-to-recipe" className="block text-gray-300 hover:text-cinematic-accent transition-colors">AI Scene</a>
            <a href="/community" className="block text-gray-300 hover:text-cinematic-accent transition-colors">Community</a>
            <div className="pt-3 border-t border-gray-700">
              <a href="/login" className="block text-gray-300 hover:text-cinematic-accent transition-colors mb-2">Login</a>
              <a href="/register" className="block btn-primary text-center">Sign Up</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

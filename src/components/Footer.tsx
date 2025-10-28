import { Film, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cinematic-dark border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-8 h-8 text-cinematic-accent" />
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-cinematic-gold to-cinematic-accent bg-clip-text text-transparent">
                CineTaste
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Blending the art of cinema with the joy of cooking.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/browse" className="text-gray-400 hover:text-cinematic-accent transition-colors">Browse Recipes</a></li>
              <li><a href="/scene-to-recipe" className="text-gray-400 hover:text-cinematic-accent transition-colors">AI Scene Recognition</a></li>
              <li><a href="/community" className="text-gray-400 hover:text-cinematic-accent transition-colors">Community Feed</a></li>
              <li><a href="/challenges" className="text-gray-400 hover:text-cinematic-accent transition-colors">Cooking Challenges</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="text-gray-400 hover:text-cinematic-accent transition-colors">About Us</a></li>
              <li><a href="/help" className="text-gray-400 hover:text-cinematic-accent transition-colors">Help Center</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-cinematic-accent transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-cinematic-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-cinematic-gray-light rounded-lg hover:bg-cinematic-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-cinematic-gray-light rounded-lg hover:bg-cinematic-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-cinematic-gray-light rounded-lg hover:bg-cinematic-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-cinematic-gray-light rounded-lg hover:bg-cinematic-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2025 CineTaste. All rights reserved. Taste the Movie.</p>
        </div>
      </div>
    </footer>
  );
}

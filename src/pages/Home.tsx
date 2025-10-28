import { ArrowRight, TrendingUp, Trophy, Sparkles } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import Button from '../components/Button';

export default function Home() {
  const featuredRecipes = [
    {
      id: '1',
      title: 'Ratatouille - Classic French Vegetable Stew',
      image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Ratatouille',
      cookingTime: 45,
      difficulty: 'Medium' as const,
      rating: 4.8,
      reviewCount: 234,
    },
    {
      id: '2',
      title: 'Butter Beer - Harry Potter Magic Drink',
      image: 'https://images.pexels.com/photos/1684032/pexels-photo-1684032.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Harry Potter',
      cookingTime: 15,
      difficulty: 'Easy' as const,
      rating: 4.9,
      reviewCount: 567,
    },
    {
      id: '3',
      title: 'Tiramisu - Godfather Italian Dessert',
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'The Godfather',
      cookingTime: 60,
      difficulty: 'Hard' as const,
      rating: 4.7,
      reviewCount: 189,
    },
    {
      id: '4',
      title: 'Big Kahuna Burger - Pulp Fiction Style',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Pulp Fiction',
      cookingTime: 30,
      difficulty: 'Easy' as const,
      rating: 4.6,
      reviewCount: 412,
    },
    {
      id: '5',
      title: 'Chocolate Cake - Matilda Famous Recipe',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Matilda',
      cookingTime: 90,
      difficulty: 'Medium' as const,
      rating: 4.9,
      reviewCount: 678,
    },
    {
      id: '6',
      title: 'Spaghetti & Meatballs - Lady and the Tramp',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Lady and the Tramp',
      cookingTime: 50,
      difficulty: 'Medium' as const,
      rating: 4.8,
      reviewCount: 345,
    },
  ];

  const challenges = [
    {
      title: 'Winter Movie Marathon',
      description: 'Cook 5 dishes from winter-themed movies',
      participants: 1234,
      daysLeft: 12,
    },
    {
      title: 'Dessert Cinema Week',
      description: 'Master iconic movie desserts',
      participants: 892,
      daysLeft: 5,
    },
    {
      title: 'Quick Bites Challenge',
      description: 'Under 30-minute movie recipes',
      participants: 2156,
      daysLeft: 8,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cinematic background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-cinematic-darker" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-cinematic-gold via-cinematic-accent to-cinematic-gold bg-clip-text text-transparent">
                Taste the Movie
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover culinary stories from the silver screen. Recreate iconic dishes and share your creations with a vibrant community.
            </p>

            <SearchBar
              placeholder="Search by movie, dish, or ingredient..."
              className="max-w-3xl mx-auto mb-8"
            />

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2 flex items-center">
                <span>Explore Recipes</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2 flex items-center">
                <Sparkles className="w-5 h-5" />
                <span>Upload Scene</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Featured Recipes</h2>
            <p className="text-gray-400">Trending dishes from iconic movies</p>
          </div>
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>View All</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </section>

      <section className="bg-cinematic-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Cooking Challenges</h2>
              <p className="text-gray-400">Join the community and win badges</p>
            </div>
            <Button variant="secondary" className="hidden md:flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>View All Challenges</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-cinematic-gray rounded-xl p-6 border border-gray-800 hover:border-cinematic-gold transition-all duration-300 hover:shadow-glow-gold"
              >
                <div className="flex items-start justify-between mb-4">
                  <Trophy className="w-8 h-8 text-cinematic-gold" />
                  <span className="text-sm text-gray-400">{challenge.daysLeft} days left</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{challenge.participants.toLocaleString()} participants</span>
                  <Button size="sm">Join Challenge</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-cinematic-accent to-cinematic-gold rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Join the CineTaste Community
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Share your culinary creations, connect with fellow movie food enthusiasts, and discover new recipes every day.
          </p>
          <Button variant="secondary" size="lg" className="bg-white text-cinematic-accent hover:bg-gray-100">
            Sign Up Free
          </Button>
        </div>
      </section>
    </div>
  );
}

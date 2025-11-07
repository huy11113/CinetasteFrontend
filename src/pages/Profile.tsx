import { useState } from 'react';
import { Settings, Users, Award, BookOpen, Heart, Calendar, MapPin } from 'lucide-react';
import RecipeCard from '../components/ui/RecipeCard';
import Button from '../components/ui/Button';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<'recipes' | 'favorites' | 'achievements'>('recipes');

  const user = {
    name: 'Chef Auguste',
    username: '@chef_auguste',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    banner: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1920',
    bio: 'Passionate about recreating iconic movie dishes. Master chef and cinema enthusiast. Sharing culinary stories one recipe at a time.',
    location: 'Paris, France',
    joinDate: 'January 2023',
    followers: 12453,
    following: 234,
    recipesCount: 47,
  };

  const recipes = [
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
      title: 'Tiramisu - Godfather Italian Dessert',
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'The Godfather',
      cookingTime: 60,
      difficulty: 'Hard' as const,
      rating: 4.7,
      reviewCount: 189,
    },
    {
      id: '3',
      title: 'Chocolate Cake - Matilda Famous Recipe',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Matilda',
      cookingTime: 90,
      difficulty: 'Medium' as const,
      rating: 4.9,
      reviewCount: 678,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'Master Chef',
      description: 'Published 50+ recipes',
      icon: Award,
      color: 'text-cinematic-gold',
      unlocked: true,
    },
    {
      id: 2,
      title: 'Community Favorite',
      description: '10,000+ followers',
      icon: Users,
      color: 'text-cinematic-accent',
      unlocked: true,
    },
    {
      id: 3,
      title: 'Movie Buff',
      description: 'Recipes from 25+ movies',
      icon: BookOpen,
      color: 'text-blue-400',
      unlocked: true,
    },
    {
      id: 4,
      title: 'Rising Star',
      description: '1,000+ recipe likes',
      icon: Heart,
      color: 'text-pink-400',
      unlocked: false,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      <div className="relative h-80">
        <img
          src={user.banner}
          alt="Profile banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cinematic-darker" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-32 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 mb-8">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-40 h-40 rounded-full border-4 border-cinematic-darker shadow-glow-red"
            />

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-display font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-gray-400 mb-2">{user.username}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="secondary">
                    <Users className="w-4 h-4 mr-2" />
                    Follow
                  </Button>
                  <a href="/profile/edit">
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </a>
                </div>
              </div>

              <p className="text-gray-300 mb-4 max-w-2xl">{user.bio}</p>

              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{user.recipesCount}</p>
                  <p className="text-sm text-gray-400">Recipes</p>
                </div>
                <div className="text-center cursor-pointer hover:text-cinematic-accent transition-colors">
                  <p className="text-2xl font-bold text-white">{user.followers.toLocaleString()}</p>
                  <p className="text-sm text-gray-400">Followers</p>
                </div>
                <div className="text-center cursor-pointer hover:text-cinematic-accent transition-colors">
                  <p className="text-2xl font-bold text-white">{user.following}</p>
                  <p className="text-sm text-gray-400">Following</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-800 mb-8">
            <div className="flex space-x-8">
              {(['recipes', 'favorites', 'achievements'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-cinematic-accent'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cinematic-accent" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'recipes' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold text-white">My Recipes</h2>
                <a href="/recipe/submit">
                  <Button>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Add Recipe
                  </Button>
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">Favorite Recipes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.slice(0, 2).map((recipe) => (
                  <RecipeCard key={recipe.id} {...recipe} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">Achievements & Badges</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-cinematic-gray rounded-xl p-6 border ${
                      achievement.unlocked
                        ? 'border-cinematic-accent shadow-glow-red'
                        : 'border-gray-800 opacity-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-4 rounded-full bg-cinematic-gray-light ${achievement.color}`}>
                        <achievement.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                        <p className="text-gray-400">{achievement.description}</p>
                        {achievement.unlocked && (
                          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-cinematic-accent/20 text-cinematic-accent text-sm">
                            Unlocked
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

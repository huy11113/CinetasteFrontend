import { useState } from 'react';
import { Clock, ChefHat, Star, Users, Bookmark, Share2, Film, Sparkles, MessageCircle, ThumbsUp } from 'lucide-react';
import Button from '../components/ui/Button';

export default function RecipeDetail() {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const recipe = {
    id: '1',
    title: 'Ratatouille - Classic French Vegetable Stew',
    description: 'A rustic French Provençal dish featuring layers of vibrant vegetables, slow-cooked to perfection. Made famous by Pixar\'s animated masterpiece, this dish celebrates simplicity and flavor.',
    image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=1920',
    movieTitle: 'Ratatouille',
    movieYear: 2007,
    prepTime: 20,
    cookTime: 45,
    servings: 6,
    difficulty: 'Medium',
    rating: 4.8,
    reviewCount: 234,
    calories: 180,
    author: {
      name: 'Chef Auguste',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    },
    ingredients: [
      '2 eggplants, sliced',
      '3 zucchinis, sliced',
      '4 tomatoes, sliced',
      '2 yellow squash, sliced',
      '1 red bell pepper, diced',
      '1 yellow bell pepper, diced',
      '1 onion, diced',
      '4 cloves garlic, minced',
      '2 tbsp olive oil',
      '2 tbsp fresh thyme',
      'Salt and pepper to taste',
      '1 cup tomato sauce',
    ],
    instructions: [
      {
        step: 1,
        title: 'Prepare the base',
        description: 'Preheat oven to 375°F. Spread tomato sauce on the bottom of a baking dish. Sauté onions, bell peppers, and garlic in olive oil until softened.',
      },
      {
        step: 2,
        title: 'Slice vegetables',
        description: 'Thinly slice all vegetables into 1/8-inch rounds. Try to keep them uniform for even cooking.',
      },
      {
        step: 3,
        title: 'Layer vegetables',
        description: 'Arrange sliced vegetables in alternating patterns over the sauce. Stand them upright in a circular pattern.',
      },
      {
        step: 4,
        title: 'Season and bake',
        description: 'Drizzle with olive oil, sprinkle with thyme, salt, and pepper. Cover with parchment paper and bake for 45 minutes.',
      },
      {
        step: 5,
        title: 'Serve',
        description: 'Remove from oven, let rest for 5 minutes. Serve warm with crusty bread.',
      },
    ],
    nutrition: {
      calories: 180,
      protein: '4g',
      carbs: '28g',
      fat: '7g',
      fiber: '8g',
    },
  };

  const comments = [
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      comment: 'Absolutely delicious! Made this for dinner and my family loved it. The layering technique really makes a difference.',
      date: '2 days ago',
      likes: 12,
    },
    {
      id: 2,
      user: 'Marco Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      comment: 'Perfect recipe! I added some fresh basil at the end. Highly recommend watching the movie while cooking this.',
      date: '1 week ago',
      likes: 8,
    },
  ];

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="relative h-[60vh] mb-8">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-darker via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-4">
              <Film className="w-5 h-5 text-cinematic-gold" />
              <span className="text-cinematic-gold font-medium">{recipe.movieTitle} ({recipe.movieYear})</span>
            </div>
            <h1 className="text-5xl font-display font-bold text-white mb-4">{recipe.title}</h1>
            <div className="flex items-center space-x-6 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-cinematic-gold fill-cinematic-gold" />
                <span className="font-semibold">{recipe.rating}</span>
                <span className="text-gray-400">({recipe.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChefHat className="w-5 h-5" />
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  className="w-12 h-12 rounded-full border-2 border-cinematic-accent"
                />
                <div>
                  <p className="text-sm text-gray-400">Recipe by</p>
                  <p className="text-white font-semibold">{recipe.author.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{recipe.description}</p>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 overflow-hidden mb-8">
              <div className="flex border-b border-gray-800">
                {(['ingredients', 'instructions', 'nutrition'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-cinematic-accent text-white'
                        : 'text-gray-400 hover:text-white hover:bg-cinematic-gray-light'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cinematic-gray-light cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checkedIngredients.includes(index)}
                          onChange={() => toggleIngredient(index)}
                          className="w-5 h-5 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <span className={`text-gray-300 ${checkedIngredients.includes(index) ? 'line-through opacity-50' : ''}`}>
                          {ingredient}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === 'instructions' && (
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction) => (
                      <div key={instruction.step} className="flex space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cinematic-accent flex items-center justify-center text-white font-bold">
                          {instruction.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">{instruction.title}</h4>
                          <p className="text-gray-400">{instruction.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(recipe.nutrition).map(([key, value]) => (
                      <div key={key} className="bg-cinematic-gray-light rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-cinematic-accent mb-1">{value}</p>
                        <p className="text-sm text-gray-400 capitalize">{key}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Reviews & Comments</h3>

              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-800 pb-6 last:border-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-white font-semibold">{comment.user}</p>
                            <div className="flex items-center space-x-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < comment.rating
                                        ? 'text-cinematic-gold fill-cinematic-gold'
                                        : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-3">{comment.comment}</p>
                        <button className="flex items-center space-x-1 text-sm text-gray-400 hover:text-cinematic-accent transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <textarea
                  placeholder="Share your experience with this recipe..."
                  className="input-field min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-gray-600 hover:text-cinematic-gold transition-colors">
                        <Star className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                  <Button>Post Comment</Button>
                </div>
              </div>
            </div>
          </main>

          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-cinematic-accent to-cinematic-gold rounded-xl p-6 mb-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Sous-Chef
                </h3>
              </div>
              <p className="text-white/90 text-sm mb-4">
                Get instant help with ingredient substitutions, dietary modifications, and cooking tips!
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-cinematic-accent hover:bg-gray-100"
                onClick={() => setShowAIPanel(!showAIPanel)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask AI Assistant
              </Button>

              {showAIPanel && (
                <div className="mt-4 space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Make it vegan
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Reduce cooking time
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Substitute ingredients
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Adjust servings
                  </button>
                </div>
              )}
            </div>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold mb-4">Similar Recipes</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <a key={i} href="#" className="flex space-x-3 group">
                    <img
                      src={`https://images.pexels.com/photos/${1279330 + i}/pexels-photo-${1279330 + i}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                      alt="Recipe"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium group-hover:text-cinematic-accent transition-colors line-clamp-2">
                        Another Delicious Recipe
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>30 min</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Plus, X, Image as ImageIcon, Film, Clock, ChefHat, Users, Sparkles, Save } from 'lucide-react';
import Button from '../components/ui/Button';

export default function SubmitRecipe() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    movieTitle: '',
    movieYear: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Medium',
    cuisine: '',
  });

  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState([{ step: 1, title: '', description: '' }]);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    setInstructions([...instructions, { step: instructions.length + 1, title: '', description: '' }]);
  };

  const updateInstruction = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...instructions];
    updated[index][field] = value;
    setInstructions(updated);
  };

  const removeInstruction = (index: number) => {
    const updated = instructions.filter((_, i) => i !== index);
    setInstructions(updated.map((inst, i) => ({ ...inst, step: i + 1 })));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit recipe:', { formData, ingredients, instructions, tags });
  };

  const handleThumbnailUpload = () => {
    console.log('Upload thumbnail');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="section-title">Submit Recipe</h1>
          <p className="text-gray-400">Share your movie-inspired culinary creation with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Basic Information</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Ratatouille - Classic French Vegetable Stew"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field min-h-[120px] resize-none"
                  placeholder="Describe your recipe and its connection to the movie..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Film className="w-4 h-4 inline mr-1" />
                    Movie Title *
                  </label>
                  <input
                    type="text"
                    value={formData.movieTitle}
                    onChange={(e) => setFormData({ ...formData, movieTitle: e.target.value })}
                    className="input-field"
                    placeholder="e.g., Ratatouille"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Movie Year
                  </label>
                  <input
                    type="number"
                    value={formData.movieYear}
                    onChange={(e) => setFormData({ ...formData, movieYear: e.target.value })}
                    className="input-field"
                    placeholder="e.g., 2007"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.prepTime}
                    onChange={(e) => setFormData({ ...formData, prepTime: e.target.value })}
                    className="input-field"
                    placeholder="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.cookTime}
                    onChange={(e) => setFormData({ ...formData, cookTime: e.target.value })}
                    className="input-field"
                    placeholder="45"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    Servings
                  </label>
                  <input
                    type="number"
                    value={formData.servings}
                    onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                    className="input-field"
                    placeholder="4"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <ChefHat className="w-4 h-4 inline mr-1" />
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="input-field"
                  >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Cuisine Type
                </label>
                <input
                  type="text"
                  value={formData.cuisine}
                  onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  className="input-field"
                  placeholder="e.g., French"
                />
              </div>
            </div>
          </div>

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Recipe Thumbnail</h2>
              <Button type="button" variant="outline" size="sm" onClick={handleThumbnailUpload}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
            </div>

            <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-cinematic-accent transition-colors">
              {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail" className="max-h-64 mx-auto rounded-lg" />
              ) : (
                <div>
                  <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Ingredients *</h2>
              <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-6">{index + 1}.</span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="e.g., 2 eggplants, sliced"
                    required
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Cooking Instructions *</h2>
              <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>

            <div className="space-y-6">
              {instructions.map((instruction, index) => (
                <div key={index} className="relative bg-cinematic-gray-light rounded-lg p-6 border border-gray-700">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cinematic-accent flex items-center justify-center text-white font-bold">
                      {instruction.step}
                    </div>
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={instruction.title}
                        onChange={(e) => updateInstruction(index, 'title', e.target.value)}
                        className="input-field"
                        placeholder="Step title (e.g., Prepare the base)"
                        required
                      />
                      <textarea
                        value={instruction.description}
                        onChange={(e) => updateInstruction(index, 'description', e.target.value)}
                        className="input-field min-h-[80px] resize-none"
                        placeholder="Detailed instructions for this step..."
                        required
                      />
                    </div>
                    {instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Tags</h2>
            <p className="text-gray-400 text-sm mb-4">
              Add tags to help others discover your recipe
            </p>

            <div className="flex items-center space-x-3 mb-4">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="input-field flex-1"
                placeholder="e.g., vegetarian, french, easy"
              />
              <Button type="button" onClick={addTag}>
                Add Tag
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-cinematic-accent/20 text-cinematic-accent rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-cinematic-accent to-cinematic-gold rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <Sparkles className="w-6 h-6 text-white flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-white font-bold mb-2">AI Recipe Assistant</h3>
                <p className="text-white/90 text-sm mb-4">
                  Need help? Our AI can generate ingredients, suggest cooking steps, or optimize your recipe.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button type="button" variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 border-0">
                    Generate Ingredients
                  </Button>
                  <Button type="button" variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 border-0">
                    Suggest Steps
                  </Button>
                  <Button type="button" variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 border-0">
                    Optimize Recipe
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button type="button" variant="secondary">
              Save as Draft
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Publish Recipe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

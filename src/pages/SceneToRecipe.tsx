import { useState } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, ArrowRight, Film } from 'lucide-react';
import Button from '../components/Button';
import RecipeCard from '../components/RecipeCard';

export default function SceneToRecipe() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const detectedDish = {
    name: 'Ratatouille',
    confidence: 94,
    movie: 'Ratatouille (2007)',
    ingredients: ['Eggplant', 'Zucchini', 'Tomato', 'Bell Pepper', 'Onion'],
  };

  const suggestedRecipes = [
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
      title: 'Provençal Vegetable Tian',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Ratatouille',
      cookingTime: 60,
      difficulty: 'Medium' as const,
      rating: 4.6,
      reviewCount: 156,
    },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      simulateAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const reset = () => {
    setUploadedImage(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-cinematic-gold" />
          </div>
          <h1 className="section-title">Scene to Recipe AI</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload a movie scene and let our AI identify the dish and suggest recipes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            {!uploadedImage ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-cinematic-accent bg-cinematic-accent/10'
                    : 'border-gray-700 hover:border-cinematic-accent'
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-cinematic-gray-light flex items-center justify-center">
                      <Upload className="w-10 h-10 text-cinematic-accent" />
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-white mb-2">
                        Drop your image here
                      </p>
                      <p className="text-gray-400 mb-4">or click to browse</p>
                      <Button type="button" variant="outline">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, WEBP (Max 10MB)
                    </p>
                  </div>
                </label>
              </div>
            ) : (
              <div className="relative bg-cinematic-gray rounded-2xl overflow-hidden border border-gray-800">
                <img
                  src={uploadedImage}
                  alt="Uploaded scene"
                  className="w-full h-auto"
                />
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="absolute inset-0 border-4 border-cinematic-accent/30 rounded-full" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-cinematic-accent rounded-full animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-cinematic-accent animate-pulse" />
                      </div>
                      <p className="text-white font-semibold mb-2">Analyzing Scene...</p>
                      <p className="text-gray-400 text-sm">AI is detecting the dish</p>
                    </div>
                  </div>
                )}
                {analysisComplete && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 animate-fade-in">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Analysis Complete</span>
                  </div>
                )}
              </div>
            )}

            {uploadedImage && (
              <div className="mt-4 flex items-center justify-center space-x-4">
                <Button variant="secondary" onClick={reset}>
                  Try Another Image
                </Button>
              </div>
            )}
          </div>

          <div>
            {!analysisComplete ? (
              <div className="bg-cinematic-gray rounded-2xl border border-gray-800 p-8 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-cinematic-gray-light mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-400">
                    {uploadedImage
                      ? 'Analyzing your image...'
                      : 'Upload an image to see AI detection results'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-cinematic-accent to-cinematic-gold rounded-2xl p-8 text-white animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <Sparkles className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Detection Results</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-white/80 text-sm mb-2">Detected Dish</p>
                    <p className="text-3xl font-display font-bold">{detectedDish.name}</p>
                  </div>

                  <div>
                    <p className="text-white/80 text-sm mb-2">Confidence Level</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-1000"
                          style={{ width: `${detectedDish.confidence}%` }}
                        />
                      </div>
                      <span className="text-2xl font-bold">{detectedDish.confidence}%</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/80 text-sm mb-2">Featured In</p>
                    <div className="flex items-center space-x-2 bg-white/10 px-4 py-3 rounded-lg">
                      <Film className="w-5 h-5" />
                      <span className="font-semibold">{detectedDish.movie}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/80 text-sm mb-2">Key Ingredients Detected</p>
                    <div className="flex flex-wrap gap-2">
                      {detectedDish.ingredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="px-3 py-1 bg-white/20 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {analysisComplete && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  Suggested Recipes
                </h2>
                <p className="text-gray-400">Based on AI detection results</p>
              </div>
              <Button className="flex items-center space-x-2">
                <span>View All Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>

            <div className="mt-12 bg-cinematic-gray rounded-xl border border-gray-800 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Didn't find what you're looking for?
              </h3>
              <p className="text-gray-400 mb-6">
                You can manually edit the detection or submit a new recipe for this dish
              </p>
              <div className="flex items-center justify-center space-x-4">
                <Button variant="outline">Edit Detection</Button>
                <Button>Submit New Recipe</Button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-cinematic-dark rounded-2xl p-8 border border-gray-800">
          <h3 className="text-2xl font-display font-bold text-white mb-6 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cinematic-accent/20 mx-auto mb-4 flex items-center justify-center">
                <Upload className="w-8 h-8 text-cinematic-accent" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">1. Upload Scene</h4>
              <p className="text-gray-400 text-sm">
                Upload a screenshot or photo from your favorite movie scene featuring food
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-cinematic-gold/20 mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-cinematic-gold" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">2. AI Analysis</h4>
              <p className="text-gray-400 text-sm">
                Our AI identifies the dish, ingredients, and matches it to movie database
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">3. Get Recipes</h4>
              <p className="text-gray-400 text-sm">
                Receive curated recipe suggestions to recreate the dish at home
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

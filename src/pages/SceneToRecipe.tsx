// src/pages/SceneToRecipe.tsx
import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Check, ArrowRight, Film, Loader2, X, FileCheck2, ScanSearch, CheckCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import RecipeCard from '../components/ui/RecipeCard'; // Giữ nguyên RecipeCard của bạn
import { type Recipe } from '../types'; // Import kiểu Recipe (nếu cần, nhưng RecipeCard đã tự định nghĩa)

// Định nghĩa 3 trạng thái của trang
type AnalysisState = 'idle' | 'analyzing' | 'complete';

// --- COMPONENT CON: KHUNG UPLOAD BAN ĐẦU ---
interface UploadStepProps {
  onFileSelect: (file: File) => void;
}

const UploadStep = ({ onFileSelect }: UploadStepProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Khung Upload */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-cinematic-accent bg-cinematic-accent/10 scale-105'
            : 'border-gray-700 hover:border-cinematic-accent'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-cinematic-gray-light flex items-center justify-center border-4 border-gray-700">
              <Upload className="w-10 h-10 text-cinematic-accent" />
            </div>
            <div>
              <p className="text-xl font-semibold text-white mb-2">
                Kéo thả ảnh của bạn vào đây
              </p>
              <p className="text-gray-400 mb-4">hoặc</p>
              <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
                <ImageIcon className="w-4 h-4 mr-2" />
                Chọn ảnh từ thiết bị
              </Button>
            </div>
            <p className="text-sm text-gray-500 pt-4">
              Hỗ trợ: JPG, PNG, WEBP (Tối đa 10MB)
            </p>
          </div>
        </label>
      </div>

      {/* Phần "How It Works" */}
      <div className="bg-cinematic-gray rounded-2xl p-8 border border-gray-800">
        <h3 className="text-2xl font-display font-bold text-white mb-6 text-center">
          Cách thức hoạt động
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-cinematic-accent/20 mx-auto mb-4 flex items-center justify-center">
              <FileCheck2 className="w-8 h-8 text-cinematic-accent" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">1. Tải ảnh lên</h4>
            <p className="text-gray-400 text-sm">
              Upload ảnh chụp màn hình từ bộ phim yêu thích của bạn có chứa món ăn.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-cinematic-gold/20 mx-auto mb-4 flex items-center justify-center">
              <ScanSearch className="w-8 h-8 text-cinematic-gold" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">2. AI Phân tích</h4>
            <p className="text-gray-400 text-sm">
              AI của chúng tôi sẽ nhận diện món ăn, nguyên liệu và bộ phim.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">3. Nhận Công thức</h4>
            <p className="text-gray-400 text-sm">
              Nhận ngay các công thức được gợi ý để tái tạo món ăn tại nhà.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT CON: MÀN HÌNH ĐANG PHÂN TÍCH ---
const AnalyzingStep = () => (
  <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8 flex flex-col items-center justify-center min-h-[400px] animate-fade-in">
    <div className="relative w-24 h-24">
      <div className="absolute inset-0 border-4 border-cinematic-accent/30 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-cinematic-accent rounded-full animate-spin" />
      <ScanSearch className="absolute inset-0 m-auto w-10 h-10 text-cinematic-accent" />
    </div>
    <h2 className="text-3xl font-display font-bold text-white mt-8">Đang phân tích...</h2>
    <p className="text-gray-400 mt-2 text-center max-w-sm">
      AI đang "xem" cảnh phim của bạn. Vui lòng chờ trong giây lát...
    </p>
  </div>
);

// --- COMPONENT CON: KHUNG KẾT QUẢ ---
interface ResultsStepProps {
  detectedDish: { name: string; confidence: number; movie: string; ingredients: string[] };
  suggestedRecipes: Array<any>; // Sử dụng kiểu 'any' để khớp với dữ liệu mock
}

const ResultsStep = ({ detectedDish, suggestedRecipes }: ResultsStepProps) => (
  <div className="space-y-8 animate-slide-up">
    {/* Panel 1: Kết quả nhận diện */}
    <div className="bg-cinematic-gray rounded-xl border border-cinematic-gold/50 shadow-glow-gold overflow-hidden">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Sparkles className="w-8 h-8 text-cinematic-gold" />
          <h2 className="text-3xl font-display font-bold text-white">Kết quả Nhận diện</h2>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-gray-400 text-sm mb-2">Món ăn được phát hiện</p>
            <p className="text-3xl font-display font-bold text-cinematic-accent">{detectedDish.name}</p>
          </div>

          <div className_name="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Độ chính xác</p>
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-3 bg-cinematic-gray-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cinematic-gold to-cinematic-accent rounded-full"
                    style={{ width: `${detectedDish.confidence}%` }}
                  />
                </div>
                <span className="text-2xl font-bold text-white">{detectedDish.confidence}%</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Xuất hiện trong phim</p>
              <div className="flex items-center space-x-2 bg-cinematic-gray-light px-4 py-3 rounded-lg">
                <Film className="w-5 h-5 text-cinematic-gold" />
                <span className="font-semibold text-white">{detectedDish.movie}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Nguyên liệu chính (dự đoán)</p>
            <div className="flex flex-wrap gap-2">
              {detectedDish.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="px-3 py-1 bg-cinematic-gray-light border border-gray-700 rounded-full text-sm text-gray-300"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Panel 2: Công thức gợi ý */}
    <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-display font-bold text-white">Công thức Gợi ý</h2>
        <Button variant="outline" size="sm">
          Xem tất cả <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suggestedRecipes.map((recipe) => (
          // @ts-ignore (Bỏ qua lỗi type-checking cho dữ liệu mock)
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  </div>
);

// --- COMPONENT CHÍNH CỦA TRANG ---
export default function SceneToRecipe() {
  const [state, setState] = useState<AnalysisState>('idle');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // --- DỮ LIỆU MOCK (Giữ nguyên từ file cũ) ---
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
  // ------------------------------------

  // --- CÁC HÀM XỬ LÝ ---

  const handleFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setState('analyzing');
      // --- Giả lập AI phân tích ---
      setTimeout(() => {
        setState('complete');
      }, 3000);
      // ----------------------------
      // TODO: Thay setTimeout bằng lệnh gọi apiClient.post('/recipes/ai/analyze-dish', formData)
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setState('idle');
  };

  // --- RENDER CHÍNH ---
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề trang */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-cinematic-accent/10 border border-cinematic-accent/30 mb-4">
            <Sparkles className="w-12 h-12 text-cinematic-accent" />
          </div>
          <h1 className="section-title">Scene to Recipe AI</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tải lên một cảnh phim. Để AI của chúng tôi nhận diện món ăn và tìm công thức cho bạn.
          </p>
        </div>

        {/* --- LÔ GIC HIỂN THỊ CHÍNH --- */}
        
        {/* Trạng thái 1: Chờ Upload */}
        {state === 'idle' && (
          <UploadStep onFileSelect={handleFileSelect} />
        )}

        {/* Trạng thái 2 & 3: Đã Upload (Hiển thị bố cục 2 cột) */}
        {state !== 'idle' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cột bên trái: Ảnh đã upload */}
            <aside className="lg:col-span-1">
              <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6 sticky top-24 animate-fade-in">
                <h3 className="text-xl font-semibold text-white mb-4">Cảnh phim của bạn</h3>
                <div className="aspect-video rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={uploadedImage!}
                    alt="Uploaded scene"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button variant="secondary" onClick={handleReset} className="w-full mt-4">
                  <X className="w-4 h-4 mr-2" />
                  Tải lên ảnh khác
                </Button>
              </div>
            </aside>
            
            {/* Cột bên phải: Đang phân tích hoặc Đã có kết quả */}
            <main className="lg:col-span-2">
              {state === 'analyzing' && <AnalyzingStep />}
              {state === 'complete' && (
                <ResultsStep 
                  detectedDish={detectedDish} 
                  suggestedRecipes={suggestedRecipes} 
                />
              )}
            </main>

          </div>
        )}

      </div>
    </div>
  );
}
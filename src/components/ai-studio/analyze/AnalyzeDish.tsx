import React, { useState, useRef } from 'react';
import AnalyzeInput from './AnalyzeInput';
import AnalyzeResult from './AnalyzeResult';
import apiClient from '../../../services/apiClient';
import { AnalyzeDishResponse } from './types';
import toast from 'react-hot-toast';
import { Bug } from 'lucide-react'; // Icon cho nút test

export default function AnalyzeDish() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [errorType, setErrorType] = useState<'api_block' | null>(null);

  // --- 1. DỮ LIỆU MẪU (MOCK DATA) ĐỂ TEST GIAO DIỆN ---
  const MOCK_RESULT: AnalyzeDishResponse = {
    dish_name: "Ratatouille (Rau Củ Hầm)",
    origin: "Provence, Pháp 🇫🇷",
    description: "Một món hầm nông dân khiêm tốn đã trở thành biểu tượng điện ảnh. Ratatouille tôn vinh hương vị tự nhiên của rau củ mùa hè như cà tím, bí ngòi, và cà chua, được xếp lớp tinh tế như một tác phẩm nghệ thuật.",
    nutrition_estimate: {
      calories: 180,
      protein: "4g",
      carbs: "28g",
      fat: "7g"
    },
    health_tags: ["Vegan", "Low Carb", "High Fiber", "Gluten Free"],
    pairing_suggestions: {
      drinks: ["Vang đỏ nhẹ (Pinot Noir)", "Nước chanh tươi"],
      sideDishes: ["Bánh mì giòn (Baguette)", "Cơm trắng"]
    },
    recipe: {
      difficulty: 3,
      prepTimeMinutes: 20,
      cookTimeMinutes: 45,
      servings: 4,
      ingredients: [
        { name: "Cà tím", quantity: "2 quả", unit: "vừa" },
        { name: "Bí ngòi", quantity: "2 quả", unit: "vừa" },
        { name: "Cà chua", quantity: "4 quả", unit: "lớn" },
        { name: "Hành tây", quantity: "1 củ", unit: "vừa" },
        { name: "Tỏi", quantity: "3 tép", unit: "băm" },
        { name: "Dầu ô liu", quantity: "3 muỗng", unit: "canh" }
      ],
      instructions: [
        { step: 1, description: "Sơ chế rau củ: Rửa sạch và thái lát mỏng đều nhau (khoảng 2-3mm)." },
        { step: 2, description: "Làm sốt nền (Piperade): Xào hành tây và tỏi cho thơm, thêm cà chua băm nhuyễn và nấu sệt lại." },
        { step: 3, description: "Xếp lớp: Trải sốt nền xuống đáy khay nướng. Xếp các lát rau củ xen kẽ nhau theo hình xoắn ốc đẹp mắt." },
        { step: 4, description: "Nướng: Phủ giấy bạc và nướng ở 180°C trong 40 phút. Bỏ giấy bạc và nướng thêm 10 phút." }
      ]
    },
    tips: [
      "Chọn rau củ có kích thước tương đồng để xếp lớp đẹp hơn.",
      "Thêm lá húng tây tươi (thyme) để dậy mùi thơm đặc trưng kiểu Pháp."
    ],
    movie_context: {
      title: "Ratatouille (2007)",
      scene_description: "Cảnh chú chuột Remy phục vụ món ăn dân dã này cho nhà phê bình ẩm thực khó tính Anton Ego, gợi lại ký ức tuổi thơ của ông.",
      significance: "Món ăn tượng trưng cho triết lý 'Ai cũng có thể nấu ăn' và sức mạnh của ẩm thực trong việc chạm đến cảm xúc.",
      wikipedia_link: "https://en.wikipedia.org/wiki/Ratatouille_(film)"
    }
  };

  // Hàm xử lý khi bấm nút Test
  const handleTest = () => {
    // Giả lập ảnh upload
    setImage("https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800");
    setLoading(true);
    
    // Giả lập delay 1.5 giây như đang gọi API thật
    setTimeout(() => {
      setResult(MOCK_RESULT);
      setLoading(false);
      toast.success("Đã tải dữ liệu mẫu thành công!");
    }, 1500);
  };
  // ----------------------------------------------------

  const handleFile = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! (Max 5MB)");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(selectedFile);
    setResult(null);
    setErrorType(null);
  };

  const handleReset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setContext('');
    setErrorType(null);
  };

  const analyze = async () => {
    if (!file) {
      toast.error("Vui lòng chọn ảnh!");
      return;
    }
    setLoading(true);
    setErrorType(null);
    
    const formData = new FormData();
    formData.append('image', file);
    if (context.trim()) formData.append('context', context);

    try {
      const response = await apiClient.post<AnalyzeDishResponse>('/recipes/ai/analyze-dish', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
      toast.success("Đã giải mã món ăn!");
    } catch (error: any) {
      console.error(error);
      if (error.response && (error.response.status === 403 || error.response.status === 451)) {
          setErrorType('api_block');
      } else {
          toast.error("Không thể phân tích. Thử ảnh khác nhé!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8 relative">
      
      {/* --- NÚT TEST UI (Chỉ hiện khi chưa có kết quả) --- */}
      {!result && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <button 
            onClick={handleTest}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg transition-transform hover:scale-105 border border-red-400"
            title="Click để xem trước giao diện kết quả mà không cần API"
          >
            <Bug className="w-4 h-4" /> 
            Test UI Mode
          </button>
        </div>
      )}

      {/* Logic hiển thị chính */}
      {result || loading || errorType ? (
        <AnalyzeResult 
            result={result} 
            loading={loading} 
            onReset={handleReset} 
            errorType={errorType} 
        />
      ) : (
        <AnalyzeInput 
          image={image}
          file={file}
          context={context}
          loading={loading}
          setContext={setContext}
          onFileChange={handleFile}
          onReset={handleReset}
          onAnalyze={analyze}
        />
      )}
    </div>
  );
}
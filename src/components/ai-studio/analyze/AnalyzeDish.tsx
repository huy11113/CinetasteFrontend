// src/components/ai-studio/analyze/AnalyzeDish.tsx
import { useState, useRef } from 'react';
import AnalyzeInput from './AnalyzeInput';
import AnalyzeResult from './AnalyzeResult';
import { AnalyzeDishResponse } from './types';

export default function AnalyzeDish() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [errorType, setErrorType] = useState<'api_block' | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // 🧪 TEST FUNCTION - Simulate successful analysis
  const handleTestSuccess = () => {
    setImage("https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800");
    setLoading(true);
    
    setTimeout(() => {
      setResult({
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
            { step: 3, description: "Xếp lớp: Trải sốt nền xuống đáy khay nướng. Xếp các lát rau củ xen kẽ nhau theo hình xoáy ốc đẹp mắt." },
            { step: 4, description: "Nướng: Phủ giấy bạc và nướng ở 180°C trong 40 phút. Bỏ giấy bạc và nướng thêm 10 phút." }
          ]
        },
        tips: [
          "Chọn rau củ có kích thước tương đồng để xếp lớp đẹp hơn.",
          "Thêm lá húng tây tươi (thyme) để dậy mùi thơm đặc trưng kiểu Pháp.",
          "Có thể thêm phô mai Parmesan bào mỏng ở bước cuối để tăng độ béo ngậy."
        ],
        movie_context: {
          title: "Ratatouille (2007)",
          scene_description: "Cảnh chú chuột Remy phục vụ món ăn dân dã này cho nhà phê bình ẩm thực khó tính Anton Ego, gợi lại ký ức tuổi thơ của ông.",
          significance: "Món ăn tượng trưng cho triết lý 'Ai cũng có thể nấu ăn' và sức mạnh của ẩm thực trong việc chạm đến cảm xúc.",
          wikipedia_link: "https://en.wikipedia.org/wiki/Ratatouille_(film)"
        },
        cultural_significance: "Ratatouille là món ăn truyền thống của vùng Provence, Pháp, xuất hiện từ thế kỷ 18. Ban đầu là món ăn của nông dân, sau này trở thành biểu tượng của ẩm thực Pháp tinh tế."
      });
      setLoading(false);
    }, 1500);
  };

  // 🧪 TEST FUNCTION - Simulate not food error
  const handleTestNotFood = () => {
    setImage("https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800");
    setLoading(true);
    
    setTimeout(() => {
      setResult({
        dish_name: "Không phải món ăn",
        description: "Hình ảnh này có vẻ là một bức ảnh chân dung con người, không phải là món ăn.",
        origin: "",
        nutrition_estimate: { calories: 0, protein: "0g", carbs: "0g", fat: "0g" },
        health_tags: [],
        pairing_suggestions: { drinks: [], sideDishes: [] },
        recipe: {
          difficulty: 0,
          prepTimeMinutes: 0,
          cookTimeMinutes: 0,
          servings: 0,
          ingredients: [],
          instructions: []
        },
        tips: []
      });
      setLoading(false);
    }, 1500);
  };

  // 🧪 TEST FUNCTION - Simulate blocked content
  const handleTestBlocked = () => {
    setImage("https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800");
    setLoading(true);
    
    setTimeout(() => {
      setErrorType('api_block');
      setLoading(false);
    }, 1500);
  };

  // Handler: File change
  const handleFileChange = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(selectedFile);
    setResult(null);
    setErrorType(null);
  };

  // Handler: Reset
  const handleReset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setContext('');
    setErrorType(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  // Handler: Analyze (API Call)
  const handleAnalyze = async () => {
    if (!file) {
      alert("Vui lòng chọn ảnh trước!");
      return;
    }
    
    setLoading(true);
    setErrorType(null);
    
    // === MOCK DATA FOR TESTING ===
    // Replace this with real API call:
    // const formData = new FormData();
    // formData.append('image', file);
    // if (context.trim()) formData.append('context', context);
    // const response = await apiClient.post('/recipes/ai/analyze-dish', formData);
    // setResult(response.data);
    
    setTimeout(() => {
      setResult({
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
            { step: 3, description: "Xếp lớp: Trải sốt nền xuống đáy khay nướng. Xếp các lát rau củ xen kẽ nhau theo hình xoáy ốc đẹp mắt." },
            { step: 4, description: "Nướng: Phủ giấy bạc và nướng ở 180°C trong 40 phút. Bỏ giấy bạc và nướng thêm 10 phút." }
          ]
        },
        tips: [
          "Chọn rau củ có kích thước tương đồng để xếp lớp đẹp hơn.",
          "Thêm lá húng tây tươi (thyme) để dậy mùi thơm đặc trưng kiểu Pháp.",
          "Có thể thêm phô mai Parmesan bào mỏng ở bước cuối để tăng độ béo ngậy."
        ],
        movie_context: {
          title: "Ratatouille (2007)",
          scene_description: "Cảnh chú chuột Remy phục vụ món ăn dân dã này cho nhà phê bình ẩm thực khó tính Anton Ego, gợi lại ký ức tuổi thơ của ông.",
          significance: "Món ăn tượng trưng cho triết lý 'Ai cũng có thể nấu ăn' và sức mạnh của ẩm thực trong việc chạm đến cảm xúc.",
          wikipedia_link: "https://en.wikipedia.org/wiki/Ratatouille_(film)"
        },
        cultural_significance: "Ratatouille là món ăn truyền thống của vùng Provence, Pháp, xuất hiện từ thế kỷ 18. Ban đầu là món ăn của nông dân, sau này trở thành biểu tượng của ẩm thực Pháp tinh tế."
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8 relative">
      
      {/* 🧪 TEST UI BUTTONS - Remove này khi deploy production */}
      {!result && !loading && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          <button 
            onClick={handleTestSuccess}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg shadow-lg transition-all hover:scale-105"
            title="Test kết quả thành công"
          >
            ✅ Test Success
          </button>
          <button 
            onClick={handleTestNotFood}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-lg transition-all hover:scale-105"
            title="Test không phải món ăn"
          >
            🍽️ Test Not Food
          </button>
          <button 
            onClick={handleTestBlocked}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-lg transition-all hover:scale-105"
            title="Test nội dung bị chặn"
          >
            🚫 Test Blocked
          </button>
        </div>
      )}
      
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
          inputRef={inputRef}
          setContext={setContext}
          onFileChange={handleFileChange}
          onReset={handleReset}
          onAnalyze={handleAnalyze}
        />
      )}
    </div>
  );
}
// src/pages/AIStudio.tsx - UPDATED
import { useState } from 'react';

// Import từ folder creative/
import CinematicLoader from '../../creative/CinematicLoader';
import CreativeChef, { ChefRequest } from '../../creative/CreativeChef';
import CreativeResult, { ChefResponse } from '../../creative/CreativeResult';

// Mock data generator (xóa khi backend ready)
const generateMockRecipe = async (request: ChefRequest): Promise<ChefResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 6000)); // 6s cho countdown
  
  return {
    narrativeStyle: "Action Rush" as any,
    story: `Trong cơn bão lửa của ${request.inspiration}, đầu bếp chiến trường tạo ra món ăn từ những gì còn sót lại. Mỗi nguyên liệu là một vũ khí, mỗi động tác nấu là một chiêu thức chiến đấu.`,
    recipeName: `${request.inspiration} - Chiến Trường Vị Giác`,
    ingredients: [
      "500g thịt bò Wagyu (hoặc thịt thường)",
      "3 củ khoai tây vàng",
      "2 thìa canh tương ớt Sriracha",
      "1 chén rượu vang đỏ Bordeaux",
      "Muối biển Himalaya",
      "Tiêu đen xay",
      "1 nhánh hương thảo tươi",
      "2 tép tỏi băm"
    ],
    instructions: [
      "Ướp thịt bò với muối, tiêu trong 30 phút ở nhiệt độ phòng để thịt thư giãn.",
      "Đun nóng chảo gang trên lửa lớn, thêm 1 thìa dầu ô liu extra virgin.",
      "Áp chảo thịt mỗi mặt 3-4 phút đến khi vàng nâu đều, tạo lớp vỏ giòn.",
      "Thêm khoai tây đã cắt múi cau, đảo đều với dầu thịt.",
      "Rưới rượu vang đỏ, thêm hương thảo và tỏi, hạ lửa nhỏ.",
      "Om kín nắp trong 15-20 phút đến khi khoai tây mềm.",
      "Nêm nếm lại, rắc rau mùi tây tươi và thưởng thức nóng."
    ],
    prepTime: "20 phút",
    cookTime: "45 phút",
    flavorProfile: {
      sweet: 20,
      sour: 10,
      spicy: 80,
      umami: 70,
      richness: 90
    },
    platingGuide: "Xếp miếng thịt bò ở trung tâm đĩa đen mờ, tạo hiệu ứng spotlight. Rắc khoai tây vàng xung quanh như ngọn lửa bao vây. Thêm vài nhành rau thơm và rưới sốt rượu vang đỏ tạo hiệu ứng máu chiến trường. Finish với chút muối vảy vàng.",
    musicRecommendation: "The Avengers Theme - Alan Silvestri",
    visualColors: ["#8B0000", "#FF4500", "#1a1a1a"],
    connection: `Món này không chỉ là bữa ăn - đó là tuyên ngôn chiến thắng. Giống như các anh hùng trong ${request.inspiration}, thịt bò phải trải qua "thử thách lửa" để đạt độ hoàn hảo. Rượu vang đỏ tượng trưng cho máu và nước mắt của chiến trận, trong khi hương thảo mang lại sự thanh lọc sau cơn bão.`,
    pairing: "Rượu vang đỏ Cabernet Sauvignon mạnh mẽ hoặc bia đen Guinness",
    macros: {
      calories: "650 kcal",
      protein: "45g",
      carbs: "35g",
      fat: "28g"
    }
  };
};

export default function AIStudio() {
  const [data, setData] = useState<ChefResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (request: ChefRequest) => {
    setLoading(true);
    setError(null);
    try {
      // Dùng mock service (thay bằng API call thật sau)
      const result = await generateMockRecipe(request);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Đạo diễn đã bỏ set quay. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Full Screen Loader */}
      {loading && <CinematicLoader />}

      {/* Background */}
      <div className="fixed inset-0 z-0 bg-[#0b0f19]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>
      </div>

      <main className={`relative z-10 container mx-auto px-4 py-8 md:py-16 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Header - Chỉ hiện khi chưa có data */}
        {!data && (
            <div className="text-center mb-16 animate-fade-in">
                <div className="inline-block relative">
                    <h1 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tighter shadow-black drop-shadow-2xl">
                        CINE<span className="text-amber-500">TASTE</span>
                    </h1>
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70"></div>
                </div>
                <p className="mt-6 text-sm md:text-base text-gray-400 tracking-[0.2em] uppercase font-medium max-w-xl mx-auto">
                    Biến Phim Ảnh Thành Mỹ Vị
                </p>
            </div>
        )}

        {/* Error Toast */}
        {error && (
             <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-red-900/90 text-red-100 border border-red-500 px-6 py-4 rounded-md shadow-2xl z-50 animate-slide-up flex items-center backdrop-blur-md">
                <span className="mr-3 text-2xl">🎬</span> 
                <div>
                    <p className="font-bold uppercase text-xs tracking-wider mb-1">Lỗi Sản Xuất</p>
                    <p className="text-sm">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="ml-6 p-2 hover:text-white transition-colors">✕</button>
             </div>
        )}

        {/* Dynamic Content */}
        <div className="flex justify-center">
          {!data ? (
            <CreativeChef onSubmit={handleGenerate} isLoading={loading} />
          ) : (
            <CreativeResult data={data} onReset={handleReset} />
          )}
        </div>
      </main>

      {/* Footer */}
      {!loading && !data && (
          <footer className="fixed bottom-6 w-full text-center z-0 pointer-events-none opacity-30 hover:opacity-100 transition-opacity">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">
                Đạo diễn bởi Gemini AI • Phiên bản 1.0
            </p>
          </footer>
      )}
    </div>
  );
}
import { useState, useRef } from 'react';
import AnalyzeInput from './AnalyzeInput';
import AnalyzeResult from './AnalyzeResult';
import { AnalyzeDishResponse } from '../../../types'; // Import từ types chuẩn
import apiClient from '../../../services/apiClient';
import toast from 'react-hot-toast';

export default function AnalyzeDish() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [errorType, setErrorType] = useState<'api_block' | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    // Kiểm tra dung lượng
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }
    setFile(selectedFile);
    
    // Preview ảnh
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
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast.error("Vui lòng chọn ảnh trước!");
      return;
    }
    
    setLoading(true);
    setErrorType(null);
    
    const formData = new FormData();
    formData.append('image', file);
    // Backend Java nhận tham số "context" (String)
    if (context.trim()) formData.append('context', context);

    try {
      // Gọi API: Gateway -> Recipe Service -> AI Service
      // Lưu ý: Đường dẫn này phải khớp với Route trong API Gateway
      const response = await apiClient.post<AnalyzeDishResponse>(
        '/recipes/ai/analyze-dish', // Endpoint trong RecipeController
        formData, 
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      
      setResult(response.data);
      toast.success("Phân tích thành công!");
    } catch (error: any) {
      console.error("AI Error:", error);
      
      if (error.response?.status === 400) {
         // Trường hợp ảnh không hợp lệ hoặc không phải món ăn
         toast.error(error.response.data?.message || "Không nhận diện được món ăn.");
      } else if (error.response?.status === 500) {
         toast.error("Lỗi hệ thống AI. Vui lòng thử lại sau.");
      } else {
         toast.error("Không thể kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8 relative">
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
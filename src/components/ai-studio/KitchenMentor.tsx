import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { CritiqueDishResponse } from '../../types';
import MentorInput from './mentor/MentorInput';
import MentorLoading from './mentor/MentorLoading';
import JudgeScorecard from './mentor/JudgeScorecard';
import CinematicError from './analyze/CinematicError';

const KitchenMentor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dishName, setDishName] = useState('');
  
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [result, setResult] = useState<CritiqueDishResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file || !dishName.trim()) return;
    
    setStep('loading');
    setError(null);
    
    try {
      const data = await aiService.critiqueDish(file, dishName);
      setResult(data);
      setStep('result');
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Có lỗi xảy ra khi kết nối với Giám khảo AI.");
      setStep('input');
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setDishName('');
    setResult(null);
    setError(null);
    setStep('input');
  };

  if (error) {
    return (
      <CinematicError 
        type="error" 
        title="Lỗi Hệ Thống" 
        description={error} 
        onReset={() => setError(null)} 
      />
    );
  }

  return (
    // BACKGROUND: Dark Wood Texture (Bàn gỗ tối màu)
    <div className="min-h-screen w-full bg-[#1c1917] flex items-center justify-center p-4 md:p-8 relative">
      
      {/* Wood Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 pointer-events-none"></div>
      
      {/* Lighting Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 pointer-events-none"></div>

      <div className="relative z-10 w-full">
        {step === 'input' && (
          <MentorInput 
            file={file} 
            preview={preview} 
            dishName={dishName} 
            setFile={setFile} 
            setPreview={setPreview} 
            setDishName={setDishName} 
            onSubmit={handleSubmit} 
          />
        )}

        {step === 'loading' && (
          <MentorLoading />
        )}

        {step === 'result' && result && preview && (
          <JudgeScorecard 
            data={result} 
            dishImage={preview} 
            dishName={dishName} 
            onReset={handleReset} 
          />
        )}
      </div>

    </div>
  );
};

export default KitchenMentor;
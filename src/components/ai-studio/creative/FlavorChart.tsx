// src/components/ai-studio/creative/FlavorChart.tsx
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FlavorProfile } from '../../../types/index';

interface FlavorChartProps {
  data?: FlavorProfile; // Cho phép undefined
  color?: string;
}

const FlavorChart: React.FC<FlavorChartProps> = ({ data, color = "#fbbf24" }) => {
  // 1. Safety Check: Nếu không có data, render placeholder
  if (!data) {
    return (
      <div className="w-full h-64 flex items-center justify-center border border-white/10 rounded-xl bg-white/5">
        <p className="text-xs text-gray-500 font-mono">Đang phân tích hương vị...</p>
      </div>
    );
  }

  // 2. Map data an toàn
  const chartData = [
    { subject: 'Ngọt', A: data.sweet || 0, fullMark: 10 },
    { subject: 'Chua', A: data.sour || 0, fullMark: 10 },
    { subject: 'Cay', A: data.spicy || 0, fullMark: 10 },
    { subject: 'Béo', A: data.richness || 0, fullMark: 10 },
    { subject: 'Đậm', A: data.umami || 0, fullMark: 10 },
  ];

  return (
    <div className="w-full h-64 relative animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
          <PolarGrid stroke="#ffffff" strokeOpacity={0.2} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ 
              fill: '#ffffff', 
              fontSize: 12, 
              fontWeight: 600,
              style: { textShadow: '0 2px 4px rgba(0,0,0,0.8)' }
            }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
          <Radar
            name="Hương vị"
            dataKey="A"
            stroke={color}
            strokeWidth={3}
            fill={color}
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlavorChart;
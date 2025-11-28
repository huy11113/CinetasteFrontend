import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

// Định nghĩa interface tại đây thay vì import
interface FlavorProfile {
  sweet: number;
  sour: number;
  spicy: number;
  umami: number;
  richness: number;
}

interface FlavorChartProps {
  data: FlavorProfile;
  color?: string;
}

const FlavorChart: React.FC<FlavorChartProps> = ({ data, color = "#fbbf24" }) => {
  const chartData = [
    { subject: 'Ngọt', A: data.sweet, fullMark: 100 },
    { subject: 'Chua', A: data.sour, fullMark: 100 },
    { subject: 'Cay', A: data.spicy, fullMark: 100 },
    { subject: 'Béo', A: data.richness, fullMark: 100 },
    { subject: 'Đậm đà', A: data.umami, fullMark: 100 },
  ];

  return (
    <div className="w-full h-64 relative">
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
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
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

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PriceBreakdown } from '../types';

interface PriceBreakdownChartProps {
  breakdown: PriceBreakdown;
  labels: {
    material: string;
    labor: string;
    machine: string;
  };
}

const PriceBreakdownChart: React.FC<PriceBreakdownChartProps> = ({ breakdown, labels }) => {
  const data = [
    { name: labels.material, value: breakdown.materialCost, color: '#4f46e5' },
    { name: labels.labor, value: breakdown.laborCost, color: '#10b981' },
    { name: labels.machine, value: breakdown.machineCost, color: '#f59e0b' },
  ];

  return (
    <div className="w-full h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value: number) => `${value.toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceBreakdownChart;

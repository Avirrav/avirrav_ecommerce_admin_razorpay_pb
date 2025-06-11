'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface OverviewProps {
  data: any[];
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm bg-white">
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data} margin={{ top: 20, right: 15, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis
            dataKey='name'
            stroke='#6b7280'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            stroke='#6b7280'
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value: number) => `₹${value}`}
            tickMargin={8}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontWeight: '500',
              padding: '12px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }}
            formatter={(value: number) => [`₹${value}`, 'Revenue']}
          />
          <Bar 
            dataKey='total' 
            fill='#3b82f6' 
            radius={[4, 4, 0, 0]} 
            strokeWidth={0}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
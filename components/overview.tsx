'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface OverviewProps {
  data: any[];
}

export const Overview = ({ data }: OverviewProps) => {
  return (
    <div className="rounded-lg border-2 border-black p-4 neo-shadow">
      <ResponsiveContainer width='100%' height={350}>
        <BarChart data={data} margin={{ top: 20, right: 15, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="5 5" stroke="#ccc" vertical={false} />
          <XAxis
            dataKey='name'
            stroke='#000'
            fontSize={12}
            tickLine={true}
            axisLine={{ strokeWidth: 2 }}
            tickMargin={8}
          />
          <YAxis
            stroke='#000'
            fontSize={12}
            tickLine={true}
            axisLine={{ strokeWidth: 2 }}
            tickFormatter={(value: number) => `$${value}`}
            tickMargin={8}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '10px',
              boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.8)'
            }}
          />
          <Bar 
            dataKey='total' 
            fill='#16a34a' 
            radius={[8, 8, 0, 0]} 
            strokeWidth={2}
            stroke="#000"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

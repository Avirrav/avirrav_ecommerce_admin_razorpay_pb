import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileStatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

export const MobileStatsCard = ({ title, value, icon: Icon, color }: MobileStatsCardProps) => {
  const colorClasses = {
    green: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    blue: 'bg-blue-50 border-blue-200 text-blue-600',
    purple: 'bg-indigo-50 border-indigo-200 text-indigo-600',
    orange: 'bg-orange-50 border-orange-200 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={cn(
          "p-3 rounded-xl border shadow-sm",
          colorClasses[color]
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
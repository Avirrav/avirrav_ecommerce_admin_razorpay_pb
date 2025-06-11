import { LucideIcon } from 'lucide-react';

interface MobileAccountCardProps {
  title: string;
  icon: LucideIcon;
  items: Array<{
    label: string;
    value: string;
  }>;
}

export const MobileAccountCard = ({ title, icon: Icon, items }: MobileAccountCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center mb-4 pb-3 border-b border-gray-100">
        <div className="p-2 bg-gray-50 rounded-lg mr-3">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-600 flex-shrink-0 mr-3">
              {item.label}
            </span>
            <span className="text-sm text-gray-900 text-right max-w-[60%] break-words font-medium">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
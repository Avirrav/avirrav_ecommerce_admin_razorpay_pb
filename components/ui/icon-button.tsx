import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  className,
  disabled = false
}) => {
  return ( 
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-md flex items-center justify-center bg-surface border border-border p-2',
        'polaris-shadow hover:bg-surface-hovered polaris-transition',
        'focus:polaris-focus disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {icon}
    </button>
   );
}

export default IconButton;
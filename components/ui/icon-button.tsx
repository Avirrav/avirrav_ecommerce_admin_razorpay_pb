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
        'rounded-lg flex items-center justify-center bg-background border-2 border-black p-2',
        'neo-shadow hover:translate-y-[-2px] active:translate-y-[1px] transition-all duration-200',
        'hover:bg-accent/20 disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
    >
      {icon}
    </button>
   );
}

export default IconButton;
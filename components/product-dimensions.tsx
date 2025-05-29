import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDimensionsProps {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
}

export const ProductDimensions = React.forwardRef<
  HTMLDivElement,
  ProductDimensionsProps
>(({ children, title, defaultOpen = false }, ref) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div ref={ref} className="w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-lg",
          "border-2 border-black neo-shadow bg-accent/5",
          "hover:bg-accent/10 transition-colors duration-200"
        )}
      >
        <span className="font-bold text-primary">{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-primary transition-transform duration-200",
            isOpen && "transform rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
});

ProductDimensions.displayName = "ProductDimensions";
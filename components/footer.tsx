import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="relative">
      <div className="mx-auto py-6">
        <p className="text-center text-sm font-bold">
          © 2025 <span className="font-extrabold">Pugly</span> · Built by Avirrav. All rights reserved.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-black/10"></div>
    </footer>
  );
};

export default Footer;
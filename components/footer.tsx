import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className='border-t-2 border-black bg-background relative'>
      <div className='mx-auto py-6'>
        <p className='text-center text-sm font-bold text-primary'>
          &copy; 2023 Developed by Avirrav, Inc. All rights reserved.
        </p>
      </div>
      <div className='absolute bottom-0 left-0 w-full h-[3px] bg-accent/30'></div>
    </footer>
  );
};

export default Footer;
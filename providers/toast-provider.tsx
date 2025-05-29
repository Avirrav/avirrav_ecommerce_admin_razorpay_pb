'use client';

import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#fff',
          color: '#000',
          padding: '12px 16px',
        },
        className: 'border-2 border-black rounded-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-150 hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)]'
        ,
        success: {
          duration: 2000,
          iconTheme: {
            primary: '#16a34a',
            secondary: 'white',
          },
        },
        error: {
          duration: 2000,
          iconTheme: {
            primary: '#dc2626',
            secondary: 'white',
          },
        }
      }}
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
      containerClassName="z-[9999]"
    />
  );
};
'use client';

import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#ffffff',
          color: '#202223',
          padding: '12px 16px',
          border: '1px solid #e3e3e3',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 8px -2px rgba(22, 29, 37, 0.1), 0 1px 0 0 rgba(22, 29, 37, 0.05)'
        },
        success: {
          duration: 2000,
          iconTheme: {
            primary: '#008060',
            secondary: 'white',
          },
        },
        error: {
          duration: 2000,
          iconTheme: {
            primary: '#d72c0d',
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
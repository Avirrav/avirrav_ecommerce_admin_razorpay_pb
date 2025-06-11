'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash, Upload } from 'lucide-react';
import IconButton from './icon-button';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4 flex-wrap'>
        {value.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-lg overflow-hidden border border-gray-200 shadow-sm'
          >
            <div className='z-10 absolute top-2 right-2'>
              <IconButton
                onClick={() => onRemove(url)}
                icon={<Trash className='h-4 w-4' />}
                className='bg-white hover:bg-red-50 border-red-200'
              />
            </div>
            <Image fill className='object-cover' alt='Image' src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='ecommerce_photos'>
        {({ open }) => {
          const onClick = () => open();

          return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <Button
                    type='button'
                    disabled={disabled}
                    variant='outline'
                    onClick={onClick}
                    className="mb-2"
                  >
                    Upload new
                  </Button>
                  <p className="text-sm text-gray-500">
                    Accepts images, videos, or 3D models
                  </p>
                </div>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
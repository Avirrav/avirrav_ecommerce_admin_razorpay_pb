'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
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
            className='relative w-[200px] h-[200px] rounded-lg overflow-hidden border-2 border-black neo-shadow'
          >
            <div className='z-10 absolute top-2 right-2'>
              <IconButton
                onClick={() => onRemove(url)}
                icon={<Trash className='h-4 w-4 text-primary' />}
                className='bg-white hover:bg-destructive/20'
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
            <Button
              type='button'
              disabled={disabled}
              variant='outline'
              onClick={onClick}
              className='bg-accent/10 hover:bg-accent/20 border-2 border-black rounded-lg neo-shadow'
            >
              <ImagePlus className='h-4 w-4 mr-2 text-primary' />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
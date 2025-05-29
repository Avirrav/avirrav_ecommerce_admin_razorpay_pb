'use client';

import { Loader } from '@/components/ui/loader';

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center min-h-[400px] pt-24">
      <div className="flex flex-col items-center gap-2">
        <Loader size="large" />
      </div>
    </div>
  );
};

export default Loading;
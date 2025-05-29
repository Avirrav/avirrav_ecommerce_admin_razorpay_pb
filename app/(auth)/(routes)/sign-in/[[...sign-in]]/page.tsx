import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#f4f4f4] font-sans">
      {/* Left - SignIn */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Heading Section - aligned with form */}
          <div className="mb-8 px-7">
            <h1 className="text-4xl font-black text-black mb-2">Welcome Back!</h1>
            <p className="text-gray-700 font-medium">Sign in to continue to your account</p>
          </div>

          {/* Clerk SignIn */}
          <SignIn
            appearance={{
              elements: {
                card: 'bg-white border-4 border-black rounded-none p-6 shadow-none',
                formButtonPrimary: 'bg-black text-white border-4 border-black rounded-none hover:bg-white hover:text-black transition-all',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                dividerLine: 'border-t-2 border-black',
                dividerText: 'bg-white text-black font-bold',
                socialButtonsBlockButton: 'bg-yellow-300 border-4 border-black text-black rounded-none hover:bg-yellow-400',
                formFieldInput: 'bg-transparent border-4 border-black text-black rounded-none px-3 py-2',
                formFieldLabel: 'font-bold uppercase text-sm text-black',
                footerActionLink: 'font-bold text-blue-600 underline',
              },
              variables: {
                colorPrimary: "#000000",
                fontFamily: "'Space Grotesk', sans-serif"
              }
            }}
          />
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-8">
        <div className="max-w-lg w-full">
          <div className="max-w-lg w-full">
            <Image 
              src="/auth.svg" 
              alt="Bold UI Illustration" 
              width={500}
              height={500}
              className="w-full h-auto" 
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-sm text-gray-600 font-medium">
        <span className="font-bold text-black">Pugly</span> <span className="text-black">· Powered by</span> <span className="font-bold text-black">Avirrav</span>
      </footer>

    </div>
  );
}

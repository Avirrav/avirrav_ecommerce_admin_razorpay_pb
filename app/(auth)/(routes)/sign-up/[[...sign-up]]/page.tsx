import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      {/* Mobile/Desktop - SignUp Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-6 lg:mb-8 text-center">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Join Our Platform!</h1>
            <p className="text-sm lg:text-base text-gray-600">Create your account to start managing your business</p>
          </div>

          {/* Clerk SignUp Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 lg:p-6">
              <SignUp 
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 p-0 w-full",
                    headerTitle: "text-lg lg:text-xl font-semibold text-gray-900",
                    headerSubtitle: "text-sm text-gray-600 mt-1",
                    socialButtonsBlockButton: "w-full h-10 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors",
                    socialButtonsBlockButtonText: "text-gray-700",
                    dividerLine: "bg-gray-200",
                    dividerText: "text-gray-500 text-sm",
                    formButtonPrimary: "w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors",
                    formFieldInput: "w-full h-10 px-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                    formFieldLabel: "text-sm font-medium text-gray-700 mb-1",
                    footerActionLink: "text-blue-600 hover:text-blue-700 text-sm font-medium",
                    identityPreviewText: "text-sm text-gray-600",
                    identityPreviewEditButton: "text-blue-600 hover:text-blue-700 text-sm",
                    formFieldSuccessText: "text-green-600 text-sm",
                    formFieldErrorText: "text-red-600 text-sm",
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Only - Illustration */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="max-w-lg w-full text-center">
          <div className="mb-8">
            <Image
              src="/auth.svg"
              alt="Join our platform illustration"
              width={400}
              height={400}
              className="w-full h-auto mx-auto"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Start Your Journey
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Join thousands of businesses already using our platform to grow their online presence.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Easy Setup
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                24/7 Support
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Secure Platform
              </div>
              <div className="flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Free Trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
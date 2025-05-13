import { SignUp } from '@clerk/nextjs';
import {ShoppingBasket} from 'lucide-react'

export default function Page() {
  return     <div className="relative w-full h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/352096/pexels-photo-352096.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1080&w=1920')",
          }}
        ></div>
  
        {/* Optional dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  
        {/* Branding top-left */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 text-white text-lg font-semibold">
          <ShoppingBasket className="text-xl" />
          <span>Avirrav E-Commerce</span>
        </div>
  
        {/* Sign-in form centered */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <SignUp />
        </div>
      </div>
}

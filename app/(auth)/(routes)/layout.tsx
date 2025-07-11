const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen w-full bg-gray-50 overflow-x-hidden'>
      {children}
    </div>
  );
};

export default AuthLayout;
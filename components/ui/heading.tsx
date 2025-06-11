interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h2 className='text-display font-semibold tracking-tight text-gray-900 mb-2'>
        {title}
      </h2>
      <p className='text-body text-gray-600'>{description}</p>
    </div>
  );
};
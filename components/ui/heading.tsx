interface HeadingProps {
  title: string;
  description: string;
}

export const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h2 className='text-3xl font-bold tracking-tight pb-2 relative'>
        {title}
        <span className="absolute bottom-0 left-0 w-1/3 h-2 bg-accent rounded"></span>
      </h2>
      <p className='text-sm text-muted-foreground mt-2'>{description}</p>
    </div>
  );
};

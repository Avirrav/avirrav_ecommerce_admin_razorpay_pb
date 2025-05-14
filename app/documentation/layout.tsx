export default function DocumentationLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <main className="py-10">{children}</main>
      </div>
    );
  }
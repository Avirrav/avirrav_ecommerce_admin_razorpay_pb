import CategoryPageClient from './CategoryPageClient';


interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    colorId: string;
    sizeId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params, searchParams }) => {
  return (
      <CategoryPageClient
        categoryId={params.categoryId}
        searchParams={searchParams}/>
  );
};

export default CategoryPage;
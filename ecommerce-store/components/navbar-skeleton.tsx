import Container from "@/components/ui/container";
import Skeleton from "@/components/ui/skeleton";

const NavbarSkeleton = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          {/* Store logo skeleton */}
          <div className="ml-4 flex lg:ml-0 gap-x-2">
            <Skeleton className="h-8 w-24" />
          </div>
          
          {/* Navigation items skeleton */}
          <div className="flex items-center space-x-4 ml-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          {/* Actions skeleton */}
          <div className="ml-auto flex items-center gap-x-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavbarSkeleton;
import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import { Category } from "@/types";

interface NavbarProps {
  categories: Category[];
  storeName?: string;
  username?: string;
}

const Navbar: React.FC<NavbarProps> = async ({ categories, storeName = 'Store', username}) => {
  return ( 
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">{storeName}</p>
          </Link>
          <MainNav data={categories} username={username}/>
          <NavbarActions username ={username} />
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;
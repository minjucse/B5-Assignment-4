import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname.startsWith(to);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="w-full border-b bg-background">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">Library</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/books">
                    <Button
                      variant={isActive("/books") ? "default" : "ghost"}
                      size="sm"
                    >
                      Books
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/borrows">
                    <Button
                      variant={isActive("/borrows") ? "default" : "ghost"}
                      size="sm"
                    >
                      Borrows
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/summary">
                    <Button
                      variant={isActive("/summary") ? "default" : "ghost"}
                      size="sm"
                    >
                      Summary
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container py-4">{children}</main>
    </div>
  );
}

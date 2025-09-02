import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "../ui/moodToggler";
import { BookOpen } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to;

  return (
    <nav className="bg-background ">
      <div className="max-w-7xl mx-auto h-16 flex items-center px-5 justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <BookOpen className="w-7 h-7" />
            <span className="text-2xl font-bold">Minimal</span>
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center space-x-6">
          <Link
            to="/books"
            className={`px-3 py-2 rounded-md hover:bg-muted ${
              isActive("/books") ? "bg-muted font-semibold" : ""
            }`}
          >
            All Books
          </Link>

          <Link
            to="/create-book"
            className={`px-3 py-2 rounded-md hover:bg-muted ${
              isActive("/create-book") ? "bg-muted font-semibold" : ""
            }`}
          >
            Add Book
          </Link>

          <Link
            to="/borrow-summary"
            className={`px-3 py-2 rounded-md hover:bg-muted ${
              isActive("/borrow-summary") ? "bg-muted font-semibold" : ""
            }`}
          >
            Borrow Summary
          </Link>
        </div>

        {/* Mode Toggle */}
        <div className="flex-shrink-0">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}

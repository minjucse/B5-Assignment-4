import { Facebook, Twitter, Instagram, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer className="bg-[#F5F5F3] text-gray-700 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Section */}
                <div>
                    <h2 className="flex items-center text-gray-900">
                        <BookOpen className="w-7 h-7 mr-2" />
                        <span className="text-2xl font-bold">Minimal</span>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your one-stop destination for discovering and managing books.
                    </p>
                    <p className="mt-4 text-xs text-gray-500">
                        © {new Date().getFullYear()}  Minimal. All rights reserved.
                    </p>
                </div>

                {/* Middle Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li>
                            <Link to="/books" className="hover:text-black">
                                All Books
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-book" className="hover:text-black">
                                Add Book
                            </Link>
                        </li>
                        <li>
                            <Link to="/borrow-summary" className="hover:text-black">
                                Borrow Summary
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right Section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">Follow Us</h3>
                    <div className="flex space-x-4 mt-3">
                        <a href="#" className="hover:text-black">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="hover:text-black">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="hover:text-black">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

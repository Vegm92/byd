import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import ViewModeSelector from "./ViewModeSelector";
import logo from "../assets/images/byd-logo.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Vehicles", path: "/#vehicle-gallery" },
    { label: "Presentation", path: "/presentation" },
  ];

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      window.location.href = "/";
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const scrollToGallery = () => {
    if (location.pathname !== "/") {
      window.location.href = "/#vehicle-gallery";
    } else {
      document
        .getElementById("vehicle-gallery")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Top Left with clear space (3A padding) */}
          <div className="byd-logo-container flex items-center">
            <button
              onClick={scrollToTop}
              className="byd-logo flex items-center"
            >
              <img
                src={logo}
                alt="BYD Auto Logo"
                className="h-8 md:h-10 w-auto"
                style={{ minHeight: "3rem" }}
              />
            </button>
          </div>

          {/* Desktop Menu - Right */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => {
              if (item.path === "/#vehicle-gallery") {
                return (
                  <button
                    key={item.label}
                    onClick={scrollToGallery}
                    className="text-sm font-medium text-foreground hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              } else if (item.path === "/") {
                return (
                  <button
                    key={item.label}
                    onClick={scrollToTop}
                    className="text-sm font-medium text-foreground hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-sm font-medium text-foreground hover:text-red-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
            {location.pathname !== "/presentation" && <ViewModeSelector />}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t py-4 space-y-2">
            {menuItems.map((item) => {
              if (item.path === "/#vehicle-gallery") {
                return (
                  <button
                    key={item.label}
                    onClick={scrollToGallery}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              } else if (item.path === "/") {
                return (
                  <button
                    key={item.label}
                    onClick={scrollToTop}
                    className="block w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    {item.label}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-foreground hover:text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }
            })}
            {location.pathname !== "/presentation" && (
              <div className="px-4 py-2">
                <ViewModeSelector />
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

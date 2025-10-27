import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">
            Sivasankar M
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-8">
              {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full group-hover:electric-glow"></span>
                </button>
              ))}
            </div>

            {/* Small button to switch theme to light */}
            <button
              onClick={() => setTheme && setTheme("light")}
              aria-label="Switch to light theme"
              title="Light theme"
              className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-200"
            >
              {/* Sun glyph */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 0 1-2 0V5.5a1 1 0 0 1 1-1zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.5-3.5a1 1 0 0 1 1 1H21a1 1 0 0 1 0-2h-.5a1 1 0 0 1-1 1zM5.5 12a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h.5a1 1 0 0 1 1 1zM17.657 6.343a1 1 0 0 1 1.414 1.414L18.414 9a1 1 0 0 1-1.414-1.414l.657-.657zM6.343 17.657a1 1 0 0 1 1.414 1.414L7.707 20a1 1 0 0 1-1.414-1.414l.05-.929zM17.657 17.657l.657.657A1 1 0 0 1 16.9 20l-.657-.657a1 1 0 0 1 1.414-1.414zM6.343 6.343l-.657-.657A1 1 0 0 1 7.1 4l.657.657A1 1 0 0 1 6.343 6.343z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
            >
              {mobileOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 bg-background border-t border-border">
            <div className="flex flex-col px-4 py-3 space-y-2">
              {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setMobileOpen(false);
                  }}
                  className="text-muted-foreground text-left w-full py-2 hover:text-primary transition-colors duration-200"
                >
                  {item}
                </button>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setTheme && setTheme("light");
                    setMobileOpen(false);
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-md"
                >
                  {/* Sun icon small */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 4.5a1 1 0 0 1 1 1V7a1 1 0 0 1-2 0V5.5a1 1 0 0 1 1-1zm0 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zm7.5-3.5a1 1 0 0 1 1 1H21a1 1 0 0 1 0-2h-.5a1 1 0 0 1-1 1zM5.5 12a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h.5a1 1 0 0 1 1 1zM17.657 6.343a1 1 0 0 1 1.414 1.414L18.414 9a1 1 0 0 1-1.414-1.414l.657-.657zM6.343 17.657a1 1 0 0 1 1.414 1.414L7.707 20a1 1 0 0 1-1.414-1.414l.05-.929zM17.657 17.657l.657.657A1 1 0 0 1 16.9 20l-.657-.657a1 1 0 0 1 1.414-1.414zM6.343 6.343l-.657-.657A1 1 0 0 1 7.1 4l.657.657A1 1 0 0 1 6.343 6.343z" />
                  </svg>
                  Light theme
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full-Stack Developer",
    "Python & Django Expert", 
    "AI & Vision Engineer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative hero-bg overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-primary-glow rounded-full animate-float" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className="text-center z-10 px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-foreground">
          Sivasankar M
        </h1>
        
        <div className="h-20 mb-6">
          <h2 className="text-2xl md:text-4xl font-medium text-primary min-h-[3rem] flex items-center justify-center">
            <span className="inline-block animate-fade-in-up" key={currentRole}>
              {roles[currentRole]}
            </span>
          </h2>
        </div>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Building intelligent applications and seamless web experiences
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToNext}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-all duration-300 electric-glow hover:scale-105"
          >
            View My Work
          </button>
          <a href="https://drive.google.com/file/d/1gtUTFyCRC1fqh0KBrtDy5kwjzvjqggMC/view?usp=sharing" target="_blank" rel="noopener noreferrer">
          <button className="px-8 py-4 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            Download CV
          </button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown 
          className="text-primary w-8 h-8 cursor-pointer hover:text-primary-glow transition-colors"
          onClick={scrollToNext}
        />
      </div>
    </section>
  );
};

export default Hero;
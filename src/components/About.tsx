import { useEffect, useState, useRef } from "react";
import { Download } from "lucide-react";
import pic2 from "../components/assets/pic2.png";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 px-6" ref={aboutRef}>
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div
            className={`${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
            } transition-all duration-700`}
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/30">
                <div className="w-64 h-64 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={pic2}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full animate-float"></div>
              <div
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary-glow/30 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div> {/* ✅ This closing div was missing */}

          {/* Right Column - Bio */}
          <div
            className={`${
              isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"
            } transition-all duration-700 space-y-6`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate developer focused on building robust and
                scalable web applications using
                <span className="text-primary font-medium">
                  {" "}
                  Python/Django
                </span>{" "}
                and the
                <span className="text-primary font-medium"> MERN stack</span>.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My background in{" "}
                <span className="text-primary font-medium">
                  AI and computer vision
                </span>{" "}
                allows me to bring a unique, data-driven perspective to my
                projects, and I am continuously expanding my skills in
                cutting-edge CV technologies.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring the latest
                developments in machine learning, contributing to open-source
                projects, or experimenting with new frameworks and technologies.
              </p>
            </div>

             <div className="pt-6">
             <a
             href="/cv.pdf" 
             download
             className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-all duration-300 electric-glow hover:scale-105"
            >
            <Download className="w-5 h-5" />
            Download CV
            </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">
                  Projects Completed
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">
                  Technologies Mastered
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

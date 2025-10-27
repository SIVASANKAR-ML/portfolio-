import { useEffect, useState, useRef } from "react";
import { Code, Brain, Database, Wrench } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillBoxes = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      icon: <Code className="w-8 h-8 mb-4 text-primary" />,
      size: "large",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-primary mb-2">Backend</h4>
            <p className="text-sm text-muted-foreground">Python, Django, Frappe, Node.js, Express.js</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Frontend</h4>
            <p className="text-sm text-muted-foreground">React, HTML5, CSS3, JavaScript (ES6+)</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Databases</h4>
            <p className="text-sm text-muted-foreground">MongoDB, PostgreSQL</p>
          </div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Business Management Software</h4>
            <p className="text-sm text-muted-foreground">ERPNext</p>
            <p className="text-sm text-muted-foreground mt-1">Automated Procure-to-Pay cycle and developed custom finance reports.</p>
          </div>

        </div>
      ),
      delay: "0ms"
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      icon: <Brain className="w-8 h-8 mb-4 text-primary" />,
      size: "large",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Machine Learning, Deep Learning (CNNs), Model Training & Deployment</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">TensorFlow</span>
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">PyTorch</span>
            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">OpenCV</span>
          </div>
        </div>
      ),
      delay: "200ms"
    },
    {
      id: 3,
      title: "Languages & Core Tools",
      icon: <Database className="w-6 h-6 mb-3 text-primary" />,
      size: "medium",
      content: (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">Python</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">C++</span>
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">JavaScript</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">Git</span>
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">Docker</span>
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">AWS</span>
          </div>
        </div>
      ),
      delay: "400ms"
    },
    {
      id: 4,
      title: "Currently Learning",
      icon: <Wrench className="w-6 h-6 mb-3 text-primary" />,
      size: "medium",
      content: (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Advanced Computer Vision</p>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">• Object Detection</p>
            <p className="text-xs text-muted-foreground">• Image Segmentation</p>
            <p className="text-xs text-muted-foreground">• PyTorch & OpenCV</p>
          </div>
        </div>
      ),
      delay: "600ms"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6" ref={skillsRef}>
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          My Technical Toolbox
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {skillBoxes.map((box) => (
            <div
              key={box.id}
              className={`
                bg-skill-box border border-border rounded-xl p-6 card-shadow
                transition-all duration-500 hover:scale-105 hover:border-primary/50
                ${box.size === "large" ? "lg:col-span-2 lg:row-span-2" : ""}
                ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
              `}
              style={{ 
                animationDelay: isVisible ? box.delay : "0ms"
              }}
            >
              {box.icon}
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                {box.title}
              </h3>
              {box.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
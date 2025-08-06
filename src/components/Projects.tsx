import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with Django backend and React frontend, featuring payment integration and inventory management.",
      technologies: ["Django", "React", "PostgreSQL", "Stripe", "AWS"],
      category: "Web Development",
      image: "/placeholder-project1.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description: "MERN stack chat application with WebSocket integration, user authentication, and message encryption.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
      category: "Web Development",
      image: "/placeholder-project2.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Computer Vision Pipeline",
      description: "Deep learning pipeline for object detection and classification using PyTorch and OpenCV.",
      technologies: ["PyTorch", "OpenCV", "Python", "Docker"],
      category: "AI/CV",
      image: "/placeholder-project3.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Image Segmentation Tool",
      description: "Advanced image segmentation application using U-Net architecture for medical imaging analysis.",
      technologies: ["TensorFlow", "Python", "NumPy", "Matplotlib"],
      category: "AI/CV",
      image: "/placeholder-project4.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 5,
      title: "Task Management API",
      description: "RESTful API with Django REST Framework featuring JWT authentication and comprehensive task management.",
      technologies: ["Django", "DRF", "JWT", "PostgreSQL", "Redis"],
      category: "Web Development",
      image: "/placeholder-project5.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 6,
      title: "Face Recognition System",
      description: "Real-time face recognition system with live camera feed and database integration for access control.",
      technologies: ["OpenCV", "Python", "SQLite", "Tkinter"],
      category: "AI/CV",
      image: "/placeholder-project6.jpg",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  const filters = ["All", "Web Development", "AI/CV"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const getTechColor = (tech: string) => {
    const colors = {
      "Django": "bg-green-500/20 text-green-400",
      "React": "bg-blue-500/20 text-blue-400",
      "Python": "bg-yellow-500/20 text-yellow-400",
      "JavaScript": "bg-orange-500/20 text-orange-400",
      "PyTorch": "bg-red-500/20 text-red-400",
      "TensorFlow": "bg-purple-500/20 text-purple-400",
      "OpenCV": "bg-cyan-500/20 text-cyan-400",
    };
    return colors[tech as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <section id="projects" className="py-20 px-6 bg-muted/30" ref={projectsRef}>
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
          Featured Work
        </h2>
        
        {/* Filter buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4 p-1 bg-card rounded-lg border border-border">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-md transition-all duration-300 font-medium ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`
                group bg-project-card border border-border rounded-xl overflow-hidden card-shadow
                transition-all duration-500 hover:scale-105 hover:border-primary/50
                ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
              `}
              style={{ 
                animationDelay: isVisible ? `${index * 100}ms` : "0ms"
              }}
            >
              {/* Project image placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                <div className="text-4xl text-primary/40">
                  {project.category === "AI/CV" ? "🧠" : "💻"}
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a
                    href={project.liveUrl}
                    className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-glow transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs rounded-md font-medium ${getTechColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
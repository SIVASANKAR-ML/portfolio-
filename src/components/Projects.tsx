import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, Filter, X } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { useToast } from "./ui/use-toast";
// Local project images (kept inside src so Vite will bundle them)
import ecomImg from "./assets/ecom.jpg";
import pic1 from "./assets/pic.jpg";
import pic2 from "./assets/pic2.png";
import CPS from "./assets/CPS.png";
import Event from "./assets/Event.png";
import UC from "./assets/UC.png";
import stup from "./assets/stup.png"
import Xlevr from "./assets/Xlevr.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
      technologies: ["Django", "React", "PostgreSQL", "Stripe", "MongoDb"],
      category: "Web Development",
      image: ecomImg,
      // liveUrl: "#",
      githubUrl: "https://github.com/SIVASANKAR-ML/ECOM-web"
    },
    {
      id: 2,
      title: "College Project Submission Portal",
      description: "A Frappe-based web application that enables teachers to publish projects, students to submit work online, and manage approvals through Teacher → Project Head → HOD with automated email notifications.",
      technologies: ["Frappe", "Python", "JavaScript", "MariaDB", "HTML", "CSS"],
      category: "Web Development",
      image: CPS,
      // liveUrl: "#",
      githubUrl: "https://github.com/SIVASANKAR-ML/College-Project-Submission-Portal"
    },
    {
      id: 3,
      title: "Computer Vision Pipeline (Under Development)",
      description: "An ongoing deep learning project focused on building a modular computer vision pipeline for object detection and classification using PyTorch and OpenCV. Currently in active development with planned support for model optimization and real-time inference.",
      technologies: ["PyTorch", "OpenCV", "Python", "Docker"],
      category: "AI/CV",
      image: UC,
      // liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "StUp",
      description: "A modern startup web application built using React and Vite. Designed for scalability and performance, featuring a clean UI, reusable components, and seamless navigation for an enhanced user experience.",
      technologies: ["React", "Vite", "Tailwind CSS", "JavaScript"],
      category: "Web Development",
      image: stup,
      liveUrl: "https://stup-sk.netlify.app/",
      githubUrl: "https://github.com/SIVASANKAR-ML/StUp"
    },

    {
      id: 5,
      title: "Event Scheduler API",
      description: "A full-stack event scheduling app built for the SPACEAI MERN Stack Developer. Users can create, view, edit, delete, and filter events with a responsive UI, real-time updates, and GraphQL API integration.",
      technologies: [
        "Next.js 14",
        "TypeScript",
        "Apollo Client",
        "GraphQL",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS"
      ],
      category: "Web Development",
      image:Event,
      // liveUrl: "#",
      githubUrl: "https://github.com/SIVASANKAR-ML/Eventscheduler"
    },
    {
      id: 6,
      title: "Xlever - AI-Powered Student Freelance Marketplace",
      description:
        "A full-stack MERN platform that connects students and professionals through an AI-powered skill-matching system. The platform uses intelligent algorithms to match freelance tasks with students based on their skill level and experience. It also features real-time communication using Socket.io and a secure payment gateway for smooth project collaboration and transactions.",
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "Socket.io", "AI/ML", "Stripe API"],
      // belongs to multiple categories
      category: ["Web Development", "AI/CV"],
      image: Xlevr,
      // liveUrl: "#", // optional if hosted
      githubUrl: "https://github.com/adhilbathali/xLevr-Online_Marketplace" // replace with your repo link
    }

  ];

  const filters = ["All", "Web Development", "AI/CV"];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => {
        const cat = project.category;
        if (Array.isArray(cat)) {
          return cat.includes(activeFilter);
        }
        return cat === activeFilter;
      });

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
              onClick={() => setSelectedProject(project)}
              className={`
                group bg-project-card border border-border rounded-xl overflow-hidden card-shadow
                transition-all duration-500 hover:scale-105 hover:border-primary/50 cursor-pointer
                  variant: "default",
              `}
              style={{ 
                animationDelay: isVisible ? `${index * 100}ms` : "0ms"
              }}
            >
              {/* Project image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                {/* Cover image (uses imported value so Vite bundles it) */}
                <img
                  src={project.image as string}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.liveUrl && project.liveUrl !== "#" ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-glow transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  ) : (
                    <button
                      onClick={() =>
                        toast({
                          title: "Live site unavailable",
                          description: "This project is not currently Hosted. Please check the StUp live demo for a hosted example: https://stup-sk.netlify.app/",
                          variant: "default",
                        })
                      }
                      className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  )}
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

      {/* Project Details Modal */}
      {/* Blur overlay shown while modal is open */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setSelectedProject(null)}
          aria-hidden
        />
      )}

      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedProject && (
              <div className="group bg-project-card border border-border rounded-xl overflow-hidden card-shadow transition-all duration-500 hover:border-primary/50">
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                  className="absolute right-4 top-4 z-50 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

                {/* Project image */}
                <div className="relative h-72 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProject.image as string}
                  alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {selectedProject.liveUrl && selectedProject.liveUrl !== "#" ? (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-glow transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    ) : (
                      <button
                        onClick={() =>
                          toast({
                            title: "Live site unavailable",
                            description: "Dynamic Python projects are not currently Hosted. Please check the StUp live demo for a hosted example: https://stup-sk.netlify.app/",
                            variant: "default",
                          })
                        }
                        className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    )}
                    <a
                      href={selectedProject.githubUrl}
                      className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
              </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {selectedProject.title}
                  </h3>

                  <p className="text-muted-foreground mb-4">
                  {selectedProject.description}
                </p>

                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
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
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
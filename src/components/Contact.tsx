import { useState, useEffect, useRef } from "react";
import { Send, Linkedin, Github, Mail } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from "./ui/use-toast";

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const contactRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Send the message to your email (this is the primary action)
      const notifyResult = await emailjs.send(
        'service_7oxsd3s',
        'template_s0qhhzr', // Template for your notification
        {
          from_name: formData.name,
          reply_to: formData.email,
          to_email: 'sivasankar.ml12@gmail.com',
          message: formData.message,
        },
        'WcWm_VBpqS633xYWw'
      );
      console.log('Notification sent:', notifyResult);

      // 2. Attempt to send thank you email to the sender. If this fails,
      //    we still consider the overall operation successful because you
      //    received the message. Handle auto-reply errors separately.
      try {
        const replyResult = await emailjs.send(
          'service_7oxsd3s',
          'template_es82rql', // Create this template for auto-reply
          {
            to_name: formData.name,
            to_email: formData.email,
          },
          'WcWm_VBpqS633xYWw'
        );
        console.log('Auto-reply sent:', replyResult);
      } catch (replyErr) {
        console.error('Auto-reply failed:', replyErr);
        // Non-blocking toast to inform you that auto-reply failed
                toast({
                  title: "Partial success",
                  description: "Message delivered to you but confirmation email to sender failed.",
                  variant: "default",
                });
      }

      // Primary success toast
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending notification email:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30" ref={contactRef}>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          Get In Touch
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`
            ${isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"}
            space-y-8
          `}>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">
                Let's work together
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-foreground">Connect with me</h4>
              <div className="flex flex-col space-y-3">
                <a
                  href="mailto:alex@example.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  sivasankar.ml12@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/sivasankar22/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  LinkedIn Profile
                </a>
                <a
                  href="https://github.com/SIVASANKAR-ML"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`
            ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}
          `} style={{ animationDelay: "300ms" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-foreground resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary-glow transition-all duration-300 electric-glow hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 bg-background border-t border-border">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground">
          Designed & Built by <span className="text-primary font-medium">Sivasankar M</span> © {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
import { Link } from "react-router-dom";
import { Zap, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blogs" },
    ],
    Workers: [
      { name: "Find Tasks", href: "/worker/jobs" },
      { name: "How it Works", href: "/how-it-works" },
      { name: "Success Stories", href: "/success-stories" },
      { name: "Worker Support", href: "/support" },
    ],
    Employers: [
      { name: "Post a Task", href: "/employer/create-task" },
      { name: "Pricing", href: "/pricing" },
      { name: "Enterprise", href: "/enterprise" },
      { name: "Employer Guide", href: "/employer-guide" },
    ],
    Legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/taskflow", name: "Twitter" },
    { icon: Facebook, href: "https://facebook.com/taskflow", name: "Facebook" },
    { icon: Linkedin, href: "https://linkedin.com/company/taskflow", name: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/taskflow", name: "Instagram" },
  ];

  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TaskFlow
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Connect with skilled workers worldwide. Get tasks done efficiently and earn money from anywhere.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, name }) => (
                <a
                  key={name}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} TaskFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">
              Secure payments powered by industry leaders
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Mock authentication state - in real app this would come from context/store
  const isAuthenticated = location.pathname.includes('/worker') || location.pathname.includes('/employer');
  const userType = location.pathname.includes('/worker') ? 'worker' : 
                   location.pathname.includes('/employer') ? 'employer' : null;

  const navLinks = [
    { name: "Home", href: "/", active: location.pathname === "/" },
    { name: "Tasks", href: "/worker/jobs", active: location.pathname.includes("/jobs") },
    { name: "Employers", href: "/employer", active: false },
    { name: "Workers", href: "/worker", active: false },
    { name: "Blog", href: "/blogs", active: location.pathname.includes("/blog") },
    { name: "Payments", href: "/payments", active: location.pathname === "/payments" },
  ];

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                link.active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
              {link.active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                      {userType === 'worker' ? 'W' : 'E'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate(`/${userType}/profile`)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/payments')}>
                  <Zap className="mr-2 h-4 w-4" />
                  <span>Payments</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="bg-gradient-primary hover:bg-primary-dark">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${
                      link.active ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-3 pt-6 border-t">
                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                      <Link to="/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-gradient-primary" onClick={() => setIsOpen(false)}>
                      <Link to="/register">Get Started</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Navigation;
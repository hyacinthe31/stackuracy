'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Liste des liens de navigation
  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/about' },
  ];

  // Variantes pour les animations
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
    <div className='h-20 bg-gray-100'></div>
    <nav className="fixed w-full z-50 transition-all duration-300 top-9 right-0 left-0 bg-white/90 shadow-md py-4">
      <div className="mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center z-20">
            <img src="/stackuracy_logo_long.jpg" alt="Logo" className="" width={200} height={100} />
          </Link>

          {/* Menu pour grand écran */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-gray-800 hover:text-logo transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link href={"/contact"}>
              <button className="bg-logo hover:bg-logo-dark text-white font-medium px-6 py-2 rounded-full transition-colors cursor-pointer">
                Contact
              </button>
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
                {isOpen ? <X className="relative w-8 h-8">
                </X> :
                <Menu className="relative w-8 h-8">
                </Menu>
}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white absolute left-0 right-0 overflow-hidden shadow-lg"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="container mx-auto px-4 py-6 flex flex-col space-y-4 items-center"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={itemVariants}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-800 font-medium hover:text-logo transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={itemVariants}>
                <Link href={"/contact"}>
                  <button className="bg-logo hover:bg-logo-dark text-white font-medium px-6 py-2 rounded-full transition-colors cursor-pointer">
                    Contact
                  </button>
              </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

export default Navbar;
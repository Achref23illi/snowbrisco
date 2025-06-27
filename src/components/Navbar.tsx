import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { fonts } from '@/config/fonts';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navItems = [
    { name: t('navbar.ourStory'), href: '#about' },
    { name: t('navbar.availableCats'), href: '#cats' },
    { name: t('navbar.contact'), href: '#contact' }
  ];

  const handleFindPetClick = () => {
    const catsSection = document.querySelector('#cats');
    if (catsSection) {
      catsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-[#F8F4EC]/95 via-[#FCFAF6]/95 to-[#F8F4EC]/95 backdrop-blur-md shadow-xl border-b-2 border-[#FFA985]/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="SnowBrisco Premium Cattery Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span 
                className={`text-lg font-bold transition-colors duration-300 ${
                  isScrolled ? 'text-[#434343]' : 'text-white'
                }`}
                style={{ fontFamily: fonts.display }}
              >
                {t('navbar.brand')}
              </span>
              <span 
                className={`text-xs font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-[#8B8B8B]' : 'text-white/80'
                }`}
                style={{ fontFamily: fonts.sans }}
              >
                {t('navbar.tagline')}
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-[#434343] hover:text-[#FFA985]' 
                    : 'text-white hover:text-blue-200'
                }`}
                style={{ fontFamily: fonts.sans }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button and Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle isScrolled={isScrolled} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                className={`transition-all duration-300 font-medium px-6 py-2 shadow-lg ${
                  isScrolled
                    ? 'bg-gradient-to-r from-[#FFA985] to-[#FF9AC1] hover:from-[#FF9470] hover:to-[#FF85B3] text-white shadow-[#FFA985]/30'
                    : 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-slate-900'
                }`}
                style={{ fontFamily: fonts.sans }}
                onClick={handleFindPetClick}
              >
                {t('navbar.findAPet')}
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle isScrolled={isScrolled} />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`transition-colors duration-300 ${
                    isScrolled ? 'text-[#434343] hover:bg-[#FFA985]/10' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-[#F8F4EC] to-[#FCFAF6] border-l-2 border-[#FFA985]/20">
                <div className="flex flex-col h-full">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 pb-8 border-b border-[#FFA985]/20">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/50 border-2 border-[#FFA985]/30 flex items-center justify-center shadow-lg">
                      <img 
                        src="/logo.png" 
                        alt="SnowBrisco Premium Cattery Logo"
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span 
                        className="text-lg font-bold text-[#434343]"
                        style={{ fontFamily: fonts.display }}
                      >
                        {t('navbar.brand')}
                      </span>
                      <span 
                        className="text-xs text-[#8B8B8B] font-medium"
                        style={{ fontFamily: fonts.sans }}
                      >
                        {t('navbar.tagline')}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-6 py-8 flex-1">
                    {navItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className="text-[#434343] hover:text-[#FFA985] font-medium text-lg transition-colors duration-200"
                        style={{ fontFamily: fonts.sans }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-[#FFA985]/20">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#FFA985] to-[#FF9AC1] hover:from-[#FF9470] hover:to-[#FF85B3] text-white font-medium py-3 shadow-lg shadow-[#FFA985]/30"
                      style={{ fontFamily: fonts.sans }}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleFindPetClick();
                      }}
                    >
                      {t('navbar.findAPet')}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { fonts } from '@/config/fonts';

interface HeroProps {
  backgroundImage?: string;
  title: string;
  subtitle: string;
  description?: string;
  features?: string[];
  ctaText: string;
  ctaDescription?: string;
  onCtaClick?: () => void;
  showSocialSidebar?: boolean;
  showScrollIndicator?: boolean;
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactElement;
  bgColor: string;
  hoverColor: string;
}

const Hero = ({
  backgroundImage = '/video.mp4',
  title,
  subtitle,
  description,
  features,
  ctaText,
  ctaDescription,
  onCtaClick,
  showSocialSidebar = true,
  showScrollIndicator = true
}: HeroProps) => {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const socialLinks: SocialLink[] = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/snowbrisco/',
      bgColor: 'bg-gradient-to-r from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@snowbrisco',
      bgColor: 'bg-black',
      hoverColor: 'hover:bg-gray-900',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      )
    }
  ];

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default behavior - scroll to next section or contact
      const nextSection = document.querySelector('#about');
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isVideo = backgroundImage && (backgroundImage.endsWith('.mp4') || backgroundImage.endsWith('.webm') || backgroundImage.endsWith('.ogg'));

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Video or Image Background */}
      {isVideo ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundImage} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60"></div>
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 text-center relative z-10"
        style={{ y: yRange }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Main Headline */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight text-white drop-shadow-2xl px-2"
            style={{ fontFamily: fonts.display }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {title}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto font-light text-white drop-shadow-lg px-2"
            style={{ fontFamily: fonts.body }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          {description && (
            <motion.p 
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white leading-relaxed drop-shadow-lg px-2"
              style={{ fontFamily: fonts.body }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}

          {/* Features List */}
          {features && features.length > 0 && (
            <motion.div 
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 max-w-4xl mx-auto px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm md:text-base text-white drop-shadow-md"
                  style={{ fontFamily: fonts.sans }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  • {feature}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* CTA Description */}
          {ctaDescription && (
            <motion.p 
              className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto text-white drop-shadow-md px-2"
              style={{ fontFamily: fonts.body }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {ctaDescription}
            </motion.p>
          )}
          
          {/* CTA Button */}
          <motion.div 
            className="mb-12 sm:mb-16 px-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-white/20 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-slate-900 px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-medium transition-all duration-300 drop-shadow-lg w-full sm:w-auto"
                style={{ fontFamily: fonts.sans }}
                onClick={handleCtaClick}
              >
                {ctaText}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-white/70" />
        </motion.div>
      )}
      
      {/* Social Media Sidebar - Hidden on mobile, shown on desktop */}
      {showSocialSidebar && (
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col space-y-4 bg-black/20 backdrop-blur-md p-4 rounded-r-lg">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.name}
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 ${social.bgColor} ${social.hoverColor} flex items-center justify-center text-white transition-colors rounded-lg`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Social Links - Show at bottom on mobile only */}
      {showSocialSidebar && (
        <div className="fixed bottom-4 right-4 z-40 lg:hidden">
          <div className="flex space-x-3 bg-black/20 backdrop-blur-md p-3 rounded-lg">
            {socialLinks.map((social) => (
              <motion.a 
                key={social.name}
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 ${social.bgColor} ${social.hoverColor} flex items-center justify-center text-white transition-colors rounded-lg`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero; 
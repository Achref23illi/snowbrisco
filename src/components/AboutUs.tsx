import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { colors } from '@/config/colors';
import { fonts } from '@/config/fonts';

const AboutUs = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const features = [
    {
      number: t('about.stats.yearsOfJoy.number'),
      label: t('about.stats.yearsOfJoy.label'),
      description: t('about.stats.yearsOfJoy.description')
    },
    {
      number: t('about.stats.happyFamilies.number'),
      label: t('about.stats.happyFamilies.label'),
      description: t('about.stats.happyFamilies.description')
    },
    {
      number: t('about.stats.amazingBreeds.number'),
      label: t('about.stats.amazingBreeds.label'),
      description: t('about.stats.amazingBreeds.description')
    },
    {
      number: t('about.stats.loveGuarantee.number'),
      label: t('about.stats.loveGuarantee.label'),
      description: t('about.stats.loveGuarantee.description')
    }
  ];

  // Fun paw print decoration component
  const PawPrint = ({ className = "", size = "w-6 h-6" }) => (
    <div className={`${size} ${className} opacity-20`} style={{ color: colors.primary }}>
      •
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
      id="about"
    >
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawPrint className="absolute top-20 left-10 opacity-10 animate-bounce" size="w-8 h-8" />
        <PawPrint className="absolute top-40 right-20 opacity-10 animate-pulse" size="w-6 h-6" />
        <PawPrint className="absolute bottom-32 left-1/4 opacity-10 animate-bounce" size="w-7 h-7" />
        <PawPrint className="absolute bottom-20 right-1/3 opacity-10 animate-pulse" size="w-5 h-5" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header with playful design */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" style={{ backgroundColor: colors.primary }}></div>
              <motion.h2 
                className="text-4xl sm:text-5xl md:text-6xl font-bold px-2"
                style={{ 
                  fontFamily: fonts.display,
                  color: colors.text,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t('about.title')}
              </motion.h2>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" style={{ backgroundColor: colors.primary }}></div>
            </div>
            <motion.div
              className="relative max-w-4xl mx-auto"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div 
                className="bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-dashed shadow-lg"
                style={{ borderColor: colors.primary }}
              >
                <p 
                  className="text-lg sm:text-xl leading-relaxed"
                  style={{ 
                    fontFamily: fonts.body,
                    color: colors.text
                  }}
                >
                  {t('about.subtitle')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content with cozy layout */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
            
            {/* Right Content - Simba Image (moved first for mobile) */}
            <motion.div variants={fadeInUp} className="order-1 lg:order-2">
              <div className="relative">
                {/* Decorative elements around the image */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-70 animate-bounce"></div>
                
                <Card 
                  className="p-6 sm:p-8 transform hover:rotate-1 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.white} 0%, ${colors.backgroundLight} 100%)`,
                    border: `3px solid ${colors.primary}40`
                  }}
                >
                  {/* Cat ear decorations on card */}
                  <div className="absolute -top-3 left-8 w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full transform rotate-45"></div>
                  <div className="absolute -top-3 left-16 w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full transform rotate-45"></div>
                  
                  <div className="aspect-square rounded-2xl overflow-hidden relative group">
                    <img 
                      src="/simba.jpg" 
                      alt="Simba - Our Adorable Scottish Fold Star"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Cute overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <h4 
                      className="text-2xl sm:text-3xl font-bold mb-3 flex items-center justify-center gap-2"
                      style={{ 
                        fontFamily: fonts.display,
                        color: colors.text
                      }}
                    >
                      {t('about.simbaTitle')}
                    </h4>
                    <p 
                      className="text-base sm:text-lg leading-relaxed"
                      style={{ 
                        fontFamily: fonts.body,
                        color: colors.muted
                      }}
                    >
                      {t('about.simbaDescription')}
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Left Content with playful styling */}
            <motion.div variants={fadeInUp} className="space-y-8 sm:space-y-10 order-2 lg:order-1">
              <div className="relative">
                <div 
                  className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border-2 border-dotted shadow-lg relative overflow-hidden"
                  style={{ borderColor: colors.accent }}
                >
                  {/* Heart decorations */}
                  <div className="absolute top-4 right-4 text-2xl animate-pulse">
                    <div className="w-6 h-6 bg-red-400 rounded-full"></div>
                  </div>
                  
                  <h3 
                    className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-3"
                    style={{ 
                      fontFamily: fonts.display,
                      color: colors.text
                    }}
                  >
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    {t('about.howItStarted')}
                  </h3>
                  
                  <div 
                    className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed"
                    style={{ 
                      fontFamily: fonts.body,
                      color: colors.text
                    }}
                  >
                    <p className="relative pl-6">
                      <span className="absolute left-0 top-1 text-lg">•</span>
                      {t('about.paragraph1')}
                    </p>
                    <p className="relative pl-6">
                      <span className="absolute left-0 top-1 text-lg">•</span>
                      {t('about.paragraph2')}
                    </p>
                    <p className="relative pl-6">
                      <span className="absolute left-0 top-1 text-lg">•</span>
                      {t('about.paragraph3')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs; 
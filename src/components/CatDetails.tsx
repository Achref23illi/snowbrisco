import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X, Heart, Share2, Calendar, MapPin, Award, Shield, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { colors } from '@/config/colors';
import { fonts } from '@/config/fonts';

interface Cat {
  id: number;
  name: string;
  breed: string;
  age: string;
  gender: string;
  color: string;
  price: string;
  status: 'available' | 'reserved' | 'sold';
  image: string;
  description: string;
  features: string[];
}

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
}

interface CatDetailsProps {
  cat: Cat;
  isOpen: boolean;
  onClose: () => void;
}

const CatDetails = ({ cat, isOpen, onClose }: CatDetailsProps) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'details' | 'inquiry'>('details');

  // Get specific data for each cat
  const getCatSpecificData = (catId: number, catName: string) => {
    const baseData = {
      media: [
        { type: 'image' as const, src: cat.image, alt: `${catName} main photo` },
        { type: 'image' as const, src: cat.image, alt: `${catName} close-up` },
        { type: 'image' as const, src: cat.image, alt: `${catName} playing` },
      ],
      birthDate: "2024",
      weight: "2.1 lbs",
      location: "SnowBrisco Cattery, Ontario, Canada",
      microchip: "Yes",
      registration: "CFA Registered",
      parents: "Champion Sire & Dam",
      healthTests: ["PKD Clear", "HCM Clear", "PRA Clear"],
      vaccinations: ["FVRCP", "Rabies (age appropriate)"],
      personality: ["Playful", "Affectionate", "Gentle", "Social", "Curious"],
      careInfo: [
        "Regular vet checkups recommended",
        "High-quality kitten food required",
        "Indoor living preferred",
        "Daily play and interaction needed"
      ],
      specialNote: undefined as string | undefined,
      purchasePrice: "$2,500",
      rentPrice: "$150/week",
      deposit: "$500",
      includes: [
        "Health certificate",
        "Vaccination records",
        "Registration papers",
        "Starter food package",
        "Favorite toy",
        "Care instructions"
      ]
    };

    // Customize data based on specific cat
    switch (catId) {
      case 1: // Simba
        return {
          ...baseData,
          media: [
            { type: 'image' as const, src: '/simba.jpg', alt: 'Simba main photo' },
            { type: 'image' as const, src: '/simba2.jpg', alt: 'Simba portrait' },
            { type: 'video' as const, src: '/simbavideo.mp4', thumbnail: '/simba3.jpg', alt: 'Simba playing video' },
            { type: 'image' as const, src: '/simba3.jpg', alt: 'Simba close-up' },
            { type: 'image' as const, src: '/simba4.jpg', alt: 'Simba relaxing' },
          ],
          birthDate: "March 15, 2024",
          weight: "2.3 lbs",
          personality: ["Confident", "Playful", "Leader", "Affectionate", "Brave"],
          specialNote: "Simba is named after the lion king for his confident and regal personality. He loves to be the center of attention and is excellent with children.",
          parents: "Golden Champion Sire x Cream Champion Dam",
          purchasePrice: "$2,800",
          rentPrice: "$180/week"
        };
      case 2: // Elvis
        return {
          ...baseData,
          birthDate: "February 28, 2024",
          weight: "2.0 lbs",
          personality: ["Charming", "Musical", "Social", "Gentle", "Curious"],
          specialNote: "Elvis has a unique blue point coloration and seems to 'sing' when he's happy, just like his namesake! He's very social and loves meeting new people.",
          parents: "Blue Point Champion Sire x Seal Point Dam",
          purchasePrice: "$2,600",
          rentPrice: "$160/week"
        };
      case 3: // Kiara
        return {
          ...baseData,
          birthDate: "March 8, 2024",
          weight: "1.9 lbs",
          personality: ["Elegant", "Independent", "Intelligent", "Graceful", "Observant"],
          specialNote: "Kiara is a beautiful silver tabby with perfect fold ears. She's intelligent and observant, often watching everything with keen interest before joining in.",
          parents: "Silver Tabby Champion Sire x Scottish Fold Dam",
          purchasePrice: "$3,200",
          rentPrice: "$200/week"
        };
      case 4: // Eva
        return {
          ...baseData,
          birthDate: "February 20, 2024",
          weight: "2.2 lbs",
          personality: ["Calm", "Nurturing", "Gentle", "Patient", "Loving"],
          specialNote: "Eva is a classic blue British Shorthair with the breed's signature round features and plush coat. She's very calm and patient, perfect for families.",
          parents: "Blue British Shorthair Champion Sire x British Shorthair Dam",
          purchasePrice: "$2,400",
          rentPrice: "$140/week"
        };
      case 5: // Hanna
        return {
          ...baseData,
          birthDate: "March 12, 2024",
          weight: "2.1 lbs",
          personality: ["Sweet", "Cuddly", "Gentle", "Peaceful", "Loving"],
          specialNote: "Hanna has a beautiful cream coat and the sweetest disposition. She loves to cuddle and is incredibly gentle, making her perfect for any home.",
          parents: "Cream Scottish Fold Sire x Golden Scottish Fold Dam",
          purchasePrice: "$2,700",
          rentPrice: "$170/week"
        };
      default:
        return baseData;
    }
  };

  const catData = getCatSpecificData(cat.id, cat.name);

  // Reset to details screen when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentScreen('details');
    }
  }, [isOpen]);

  const handleInquire = () => {
    setCurrentScreen('inquiry');
  };

  const handleBackToDetails = () => {
    setCurrentScreen('details');
  };

  // Inquiry Screen Component
  const InquiryScreen = () => (
    <div 
      className="p-6 space-y-6 overflow-y-auto"
      style={{
        maxHeight: 'calc(90vh - 120px)',
        scrollbarWidth: 'thin',
        scrollbarColor: `${colors.primary}40 transparent`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDetails}
            className="p-2 hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: colors.muted }} />
          </Button>
          <div>
            <h2 
              className="text-2xl font-bold"
              style={{ 
                fontFamily: fonts.display,
                color: colors.text
              }}
            >
              Inquire About {cat.name}
            </h2>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: fonts.body,
                color: colors.muted
              }}
            >
              Choose your preferred option
            </p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Purchase Option */}
        <Card 
          className="p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          style={{ 
            backgroundColor: colors.white,
            borderColor: colors.primary + '40'
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
            </div>
            <h3 
              className="text-xl font-bold"
              style={{ 
                fontFamily: fonts.display,
                color: colors.text
              }}
            >
              Purchase {cat.name}
            </h3>
            <div 
              className="text-3xl font-black group-hover:scale-110 transition-transform"
              style={{ 
                fontFamily: fonts.display,
                color: colors.primary
              }}
            >
              {catData.purchasePrice}
            </div>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: fonts.body,
                color: colors.muted
              }}
            >
              Take {cat.name} home forever! Includes lifetime support and all paperwork.
            </p>
            <Button 
              className="w-full font-medium py-3 hover:shadow-lg transition-all"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white,
                fontFamily: fonts.sans
              }}
            >
              Choose Purchase
            </Button>
          </div>
        </Card>

        {/* Rent Option */}
        <Card 
          className="p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          style={{ 
            backgroundColor: colors.white,
            borderColor: colors.secondary + '40'
          }}
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 rounded-full"></div>
            </div>
            <h3 
              className="text-xl font-bold"
              style={{ 
                fontFamily: fonts.display,
                color: colors.text
              }}
            >
              Rent {cat.name}
            </h3>
            <div 
              className="text-3xl font-black group-hover:scale-110 transition-transform"
              style={{ 
                fontFamily: fonts.display,
                color: colors.secondary
              }}
            >
              {catData.rentPrice}
            </div>
            <p 
              className="text-sm"
              style={{ 
                fontFamily: fonts.body,
                color: colors.muted
              }}
            >
              Perfect for short-term companionship! Minimum 2 weeks, includes all supplies.
            </p>
            <Button 
              variant="outline"
              className="w-full font-medium py-3 hover:shadow-lg transition-all"
              style={{ 
                borderColor: colors.secondary,
                color: colors.secondary,
                fontFamily: fonts.sans
              }}
            >
              Choose Rental
            </Button>
          </div>
        </Card>
      </div>

      {/* What's Included */}
      <Card className="p-6" style={{ backgroundColor: colors.backgroundLight }}>
        <h3 
          className="text-lg font-bold mb-4 flex items-center"
          style={{ 
            fontFamily: fonts.display,
            color: colors.text
          }}
        >
          <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
          What's Included
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {catData.includes.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span 
                className="text-sm"
                style={{ 
                  fontFamily: fonts.body,
                  color: colors.text
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4" style={{ backgroundColor: colors.white }}>
          <h4 
            className="font-semibold mb-2 flex items-center"
            style={{ color: colors.text, fontFamily: fonts.sans }}
          >
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            Deposit Required
          </h4>
          <p 
            className="text-2xl font-bold"
            style={{ 
              fontFamily: fonts.display,
              color: colors.primary
            }}
          >
            {catData.deposit}
          </p>
          <p 
            className="text-xs mt-1"
            style={{ 
              fontFamily: fonts.body,
              color: colors.muted
            }}
          >
            Refundable security deposit
          </p>
        </Card>

        <Card className="p-4" style={{ backgroundColor: colors.white }}>
          <h4 
            className="font-semibold mb-2 flex items-center"
            style={{ color: colors.text, fontFamily: fonts.sans }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            Need Help?
          </h4>
          <p 
            className="text-sm"
            style={{ 
              fontFamily: fonts.body,
              color: colors.text
            }}
          >
            Call us at{" "}
            <span className="font-semibold">(438) 342-4290</span>
          </p>
          <p 
            className="text-xs mt-1"
            style={{ 
              fontFamily: fonts.body,
              color: colors.muted
            }}
          >
            We're here to help!
          </p>
        </Card>
      </div>
    </div>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return colors.success;
      case 'reserved':
        return colors.warning;
      case 'sold':
        return colors.muted;
      default:
        return colors.muted;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'reserved':
        return 'Reserved';
      case 'sold':
        return 'Sold';
      default:
        return status;
    }
  };

  const nextMedia = () => {
    setSelectedMediaIndex((prev) => (prev + 1) % catData.media.length);
  };

  const prevMedia = () => {
    setSelectedMediaIndex((prev) => (prev - 1 + catData.media.length) % catData.media.length);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 [&>button]:hidden">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="relative h-full flex flex-col"
          style={{ backgroundColor: colors.background }}
        >
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-4 border-b flex-shrink-0" style={{ backgroundColor: colors.white, borderColor: colors.border }}>
            <div className="flex items-center space-x-4">
              <h1 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: fonts.display,
                  color: colors.text
                }}
              >
                Meet {cat.name}
              </h1>
              <Badge 
                className="text-white font-medium px-3 py-1"
                style={{ 
                  backgroundColor: getStatusColor(cat.status),
                  fontFamily: fonts.sans
                }}
              >
                {getStatusText(cat.status)}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
                className="p-2"
              >
                <Heart 
                  className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
              >
                <Share2 className="w-5 h-5" style={{ color: colors.muted }} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="w-5 h-5" style={{ color: colors.muted }} />
              </Button>
            </div>
          </div>

          {/* Main Content - Flexible */}
          {currentScreen === 'details' ? (
          <div className="grid lg:grid-cols-2 gap-8 p-6 flex-1 min-h-0 overflow-hidden">
            {/* Left Column - Media Carousel + Action Buttons */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="flex flex-col space-y-4 flex-shrink-0 overflow-hidden"
            >
              {/* Main Media Display */}
              <div className="relative overflow-hidden rounded-lg" style={{ backgroundColor: colors.white }}>
                <div className={`relative ${catData.media[selectedMediaIndex].type === 'video' ? 'h-auto min-h-96' : 'h-96'}`}>
                  {catData.media[selectedMediaIndex].type === 'image' ? (
                    <img 
                      src={catData.media[selectedMediaIndex].src} 
                      alt={catData.media[selectedMediaIndex].alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full">
                      <video
                        key={selectedMediaIndex} // Force re-render when switching to video
                        src={catData.media[selectedMediaIndex].src}
                        className="w-full h-auto object-cover rounded-lg"
                        controls
                        autoPlay
                        muted // Required for autoplay in most browsers
                        poster={catData.media[selectedMediaIndex].thumbnail}
                        style={{ minHeight: '400px' }}
                      />
                    </div>
                  )}
                  
                  {/* Navigation Arrows */}
                  {catData.media.length > 1 && (
                    <>
                      <button
                        onClick={prevMedia}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextMedia}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Media Counter */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                    {selectedMediaIndex + 1} / {catData.media.length}
                  </div>
                </div>
              </div>

              {/* Media Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto">
                {catData.media.map((mediaItem, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMediaIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedMediaIndex === index 
                        ? 'border-opacity-100' 
                        : 'border-opacity-20 hover:border-opacity-60'
                    }`}
                    style={{ borderColor: colors.primary }}
                  >
                    <img 
                      src={mediaItem.thumbnail || mediaItem.src} 
                      alt={mediaItem.alt}
                      className="w-full h-full object-cover"
                    />
                    {mediaItem.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Action Buttons - Always Visible */}
              <div className="flex space-x-3 mt-6">
                                  <Button 
                    className={`flex-1 font-medium py-3 transition-all duration-300 ${
                      cat.status === 'available' 
                        ? 'hover:shadow-lg' 
                        : 'opacity-60 cursor-not-allowed'
                    }`}
                    style={{ 
                      backgroundColor: cat.status === 'available' ? colors.primary : colors.muted,
                      color: colors.white,
                      fontFamily: fonts.sans
                    }}
                    disabled={cat.status !== 'available'}
                    onClick={cat.status === 'available' ? handleInquire : undefined}
                  >
                    {cat.status === 'available' ? `Inquire About ${cat.name}` : 
                     cat.status === 'reserved' ? 'Reserved' : 'Sold'}
                  </Button>
                <Button 
                  variant="outline"
                  className="px-6 py-3"
                  style={{ 
                    borderColor: colors.border,
                    color: colors.text,
                    fontFamily: fonts.sans
                  }}
                >
                  Schedule Visit
                </Button>
              </div>
            </motion.div>

            {/* Right Column - Details (Scrollable) */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="space-y-6 overflow-y-auto pr-2"
              style={{
                maxHeight: 'calc(90vh - 120px)',
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.primary}40 transparent`
              }}
            >
                {/* Basic Info */}
                <Card className="p-6" style={{ backgroundColor: colors.white }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 
                        className="text-3xl font-bold mb-2"
                        style={{ 
                          fontFamily: fonts.display,
                          color: colors.text
                        }}
                      >
                        {cat.name}
                      </h2>
                      <p 
                        className="text-lg"
                        style={{ 
                          fontFamily: fonts.body,
                          color: colors.muted
                        }}
                      >
                        {cat.breed}
                      </p>
                    </div>
                    <div className="text-right">
                      <div 
                        className="text-3xl font-bold"
                        style={{ 
                          fontFamily: fonts.display,
                          color: colors.primary
                        }}
                      >
                        {cat.price}
                      </div>
                    </div>
                  </div>

                  <p 
                    className="text-base leading-relaxed mb-4"
                    style={{ 
                      fontFamily: fonts.body,
                      color: colors.text
                    }}
                  >
                    {cat.description}
                  </p>

                  {/* Special Note */}
                  {catData.specialNote && (
                    <div 
                      className="p-4 rounded-lg mb-4"
                      style={{ backgroundColor: colors.secondary + '20' }}
                    >
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ 
                          fontFamily: fonts.body,
                          color: colors.text
                        }}
                      >
                        <strong>Special Note:</strong> {catData.specialNote}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: colors.muted, fontFamily: fonts.sans }}>Age:</span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{cat.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.muted, fontFamily: fonts.sans }}>Gender:</span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{cat.gender}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.muted, fontFamily: fonts.sans }}>Color:</span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{cat.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: colors.muted, fontFamily: fonts.sans }}>Weight:</span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{catData.weight}</span>
                    </div>
                  </div>
                </Card>

                {/* Detailed Information */}
                <Card className="p-6" style={{ backgroundColor: colors.white }}>
                  <h3 
                    className="text-xl font-bold mb-4 flex items-center"
                    style={{ 
                      fontFamily: fonts.display,
                      color: colors.text
                    }}
                  >
                    <Award className="w-5 h-5 mr-2" style={{ color: colors.primary }} />
                    Detailed Information
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center" style={{ color: colors.muted, fontFamily: fonts.sans }}>
                        <Calendar className="w-4 h-4 mr-2" />
                        Birth Date:
                      </span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{catData.birthDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center" style={{ color: colors.muted, fontFamily: fonts.sans }}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Location:
                      </span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{catData.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center" style={{ color: colors.muted, fontFamily: fonts.sans }}>
                        <Shield className="w-4 h-4 mr-2" />
                        Registration:
                      </span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{catData.registration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center" style={{ color: colors.muted, fontFamily: fonts.sans }}>
                        <Award className="w-4 h-4 mr-2" />
                        Parents:
                      </span>
                      <span style={{ color: colors.text, fontFamily: fonts.sans }}>{catData.parents}</span>
                    </div>
                  </div>
                </Card>

                {/* Health & Care */}
                <Card className="p-6" style={{ backgroundColor: colors.white }}>
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ 
                      fontFamily: fonts.display,
                      color: colors.text
                    }}
                  >
                    Health & Care
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: colors.text, fontFamily: fonts.sans }}
                      >
                        Health Tests:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {catData.healthTests.map((test, index) => (
                          <Badge 
                            key={index}
                            className="text-xs px-2 py-1"
                            style={{ 
                              backgroundColor: colors.success + '20',
                              color: colors.success,
                              fontFamily: fonts.sans
                            }}
                          >
                            {test}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 
                        className="font-semibold mb-2"
                        style={{ color: colors.text, fontFamily: fonts.sans }}
                      >
                        Vaccinations:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {catData.vaccinations.map((vaccine, index) => (
                          <Badge 
                            key={index}
                            className="text-xs px-2 py-1"
                            style={{ 
                              backgroundColor: colors.secondary,
                              color: colors.text,
                              fontFamily: fonts.sans
                            }}
                          >
                            {vaccine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Personality */}
                <Card className="p-6" style={{ backgroundColor: colors.white }}>
                  <h3 
                    className="text-xl font-bold mb-4"
                    style={{ 
                      fontFamily: fonts.display,
                      color: colors.text
                    }}
                  >
                    Personality Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {catData.personality.map((trait, index) => (
                      <Badge 
                        key={index}
                        className="text-sm px-3 py-1"
                        style={{ 
                          backgroundColor: colors.accent + '20',
                          color: colors.accent,
                          fontFamily: fonts.sans
                        }}
                      >
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </Card>

              </motion.div>
            </div>
          ) : (
            <InquiryScreen />
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CatDetails; 
'use client';

import { useState, use } from 'react';
import Link from 'next/link';

// Mock property data
const PROPERTIES: Record<string, any> = {
  '1': {
    id: '1',
    title: '3 Bedroom Flat',
    area: 'Lekki Phase 1',
    city: 'Lagos',
    state: 'Lagos',
    annualRent: 2500000,
    moveInCost: 5200000,
    powerReliability: '20+ hours',
    waterSource: 'Borehole',
    floodRisk: 'Low',
    agentFree: true,
    bedrooms: 3,
    bathrooms: 2,
    toilets: 3,
    parking: 2,
    furnished: false,
    description: 'Spacious 3-bedroom flat in the heart of Lekki Phase 1. Features modern finishes, ample natural light, and 24/7 power supply. Close to shopping centers, schools, and major roads.',
    amenities: ['24/7 Power', 'Borehole Water', 'Parking Space', 'Security', 'Tiled Floors', 'Pop Ceiling', 'Balcony'],
    videos: [
      { id: 'v1', title: 'Living Room & Kitchen Tour', duration: '2:45', thumbnail: '/api/placeholder/400/300' },
      { id: 'v2', title: 'Master Bedroom', duration: '1:30', thumbnail: '/api/placeholder/400/300' },
      { id: 'v3', title: 'Other Bedrooms & Bathrooms', duration: '2:10', thumbnail: '/api/placeholder/400/300' },
      { id: 'v4', title: 'Compound & Surroundings', duration: '1:55', thumbnail: '/api/placeholder/400/300' }
    ],
    landlordName: 'Direct Owner',
    availableFrom: 'Immediately',
    lastUpdated: '2 days ago'
  },
  '2': {
    id: '2',
    title: '2 Bedroom Apartment',
    area: 'Ikeja GRA',
    city: 'Lagos',
    state: 'Lagos',
    annualRent: 1800000,
    moveInCost: 3800000,
    powerReliability: '12-20 hours',
    waterSource: 'Borehole',
    floodRisk: 'Low',
    agentFree: false,
    bedrooms: 2,
    bathrooms: 2,
    toilets: 2,
    parking: 1,
    furnished: false,
    description: 'Well-maintained 2-bedroom apartment in serene Ikeja GRA. Perfect for small families or professionals. Good road access and close to amenities.',
    amenities: ['Borehole Water', 'Parking Space', 'Security', 'Tiled Floors', 'Wardrobe'],
    videos: [
      { id: 'v1', title: 'Full Apartment Tour', duration: '3:20', thumbnail: '/api/placeholder/400/300' },
      { id: 'v2', title: 'Kitchen & Dining', duration: '1:45', thumbnail: '/api/placeholder/400/300' },
      { id: 'v3', title: 'Neighborhood Walk', duration: '2:30', thumbnail: '/api/placeholder/400/300' }
    ],
    landlordName: 'Via Agent',
    availableFrom: 'March 2024',
    lastUpdated: '1 week ago'
  }
};

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showContact, setShowContact] = useState(false);

  const property = PROPERTIES[id];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-white/80 mb-6">Please log in to view property details</p>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="px-8 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
          <Link href="/search" className="text-purple-400 hover:text-purple-300">
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">ShowRoom</Link>
          <div className="flex items-center gap-4">
            <Link href="/search" className="text-sm text-white/80 hover:text-white">
              ← Back to Search
            </Link>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10">
              <div className="relative aspect-video bg-black/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 hover:scale-110 transition cursor-pointer">
                      <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-lg font-semibold">{property.videos[currentVideo].title}</p>
                    <p className="text-sm text-white/60">{property.videos[currentVideo].duration}</p>
                  </div>
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.agentFree && (
                    <div className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                      Agent-free
                    </div>
                  )}
                  {property.powerReliability === '20+ hours' && (
                    <div className="px-3 py-1 bg-green-600 rounded-full text-sm font-semibold flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      24/7 Power
                    </div>
                  )}
                </div>
              </div>

              {/* Video Thumbnails */}
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {property.videos.map((video: any, index: number) => (
                  <button
                    key={video.id}
                    onClick={() => setCurrentVideo(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition ${
                      currentVideo === index ? 'border-purple-500' : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 rounded text-xs">
                      {video.duration}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <p className="text-xl text-white/80 mb-6">{property.area}, {property.city}, {property.state}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold">{property.bedrooms}</p>
                  <p className="text-sm text-white/70">Bedrooms</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold">{property.bathrooms}</p>
                  <p className="text-sm text-white/70">Bathrooms</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold">{property.toilets}</p>
                  <p className="text-sm text-white/70">Toilets</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold">{property.parking}</p>
                  <p className="text-sm text-white/70">Parking</p>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-white/80 leading-relaxed">{property.description}</p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity: string) => (
                    <span key={amenity} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Power Reliability</h3>
                  <p className="font-semibold">{property.powerReliability}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Water Source</h3>
                  <p className="font-semibold">{property.waterSource}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Flood Risk</h3>
                  <p className="font-semibold capitalize">{property.floodRisk}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white/70 mb-1">Available From</h3>
                  <p className="font-semibold">{property.availableFrom}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-white/70 mb-1">Annual Rent</p>
                <p className="text-3xl font-bold text-purple-400">{formatCurrency(property.annualRent)}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-white/10">
                <p className="text-sm text-white/70 mb-1">Total Move-in Cost</p>
                <p className="text-xl font-semibold">{formatCurrency(property.moveInCost)}</p>
                <p className="text-xs text-white/60 mt-1">Includes rent, caution, and fees</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-white/70 mb-1">Contact</p>
                <p className="font-semibold">{property.landlordName}</p>
              </div>

              {!showContact ? (
                <button
                  onClick={() => setShowContact(true)}
                  className="w-full px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition mb-3"
                >
                  Show Contact Info
                </button>
              ) : (
                <div className="mb-3 p-4 bg-white/10 rounded-lg">
                  <p className="text-sm text-white/70 mb-2">Phone Number</p>
                  <p className="text-lg font-semibold mb-3">+234 801 234 5678</p>
                  <a
                    href="tel:+2348012345678"
                    className="block w-full px-4 py-2 bg-green-600 rounded-lg text-center font-semibold hover:bg-green-700 transition"
                  >
                    Call Now
                  </a>
                </div>
              )}

              <button className="w-full px-6 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition mb-3">
                Schedule Visit
              </button>

              <button className="w-full px-6 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition">
                Save Property
              </button>

              <p className="text-xs text-white/60 text-center mt-4">
                Updated {property.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


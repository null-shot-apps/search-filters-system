'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data - Nigeria-specific properties
const MOCK_PROPERTIES = [
  {
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
    videoCount: 4,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 3,
    bathrooms: 2
  },
  {
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
    videoCount: 3,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 2,
    bathrooms: 2
  },
  {
    id: '3',
    title: '4 Bedroom Duplex',
    area: 'Ajah',
    city: 'Lagos',
    state: 'Lagos',
    annualRent: 3200000,
    moveInCost: 6700000,
    powerReliability: '20+ hours',
    waterSource: 'Borehole + Tanker',
    floodRisk: 'Medium',
    agentFree: true,
    videoCount: 6,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 4,
    bathrooms: 3
  },
  {
    id: '4',
    title: '1 Bedroom Studio',
    area: 'Yaba',
    city: 'Lagos',
    state: 'Lagos',
    annualRent: 900000,
    moveInCost: 1950000,
    powerReliability: 'Under 12 hours',
    waterSource: 'Public Supply',
    floodRisk: 'Low',
    agentFree: true,
    videoCount: 2,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 1,
    bathrooms: 1
  },
  {
    id: '5',
    title: '3 Bedroom Terrace',
    area: 'Gwarinpa',
    city: 'Abuja',
    state: 'FCT',
    annualRent: 2200000,
    moveInCost: 4600000,
    powerReliability: '20+ hours',
    waterSource: 'Borehole',
    floodRisk: 'Low',
    agentFree: false,
    videoCount: 5,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 3,
    bathrooms: 3
  },
  {
    id: '6',
    title: '2 Bedroom Flat',
    area: 'Wuse 2',
    city: 'Abuja',
    state: 'FCT',
    annualRent: 2800000,
    moveInCost: 5900000,
    powerReliability: '20+ hours',
    waterSource: 'Borehole',
    floodRisk: 'Low',
    agentFree: true,
    videoCount: 4,
    thumbnail: '/api/placeholder/400/300',
    bedrooms: 2,
    bathrooms: 2
  }
];

const STATES = ['Lagos', 'FCT', 'Rivers', 'Oyo', 'Kano'];
const CITIES: Record<string, string[]> = {
  'Lagos': ['Lagos', 'Ikeja', 'Epe'],
  'FCT': ['Abuja'],
  'Rivers': ['Port Harcourt'],
  'Oyo': ['Ibadan'],
  'Kano': ['Kano']
};
const POWER_OPTIONS = ['20+ hours', '12-20 hours', 'Under 12 hours', 'Generator only'];
const WATER_OPTIONS = ['Borehole', 'Well', 'Public Supply', 'Tanker', 'Borehole + Tanker'];
const FLOOD_OPTIONS = ['Low', 'Medium', 'High'];

export default function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulate logged in state
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [maxMoveIn, setMaxMoveIn] = useState('');
  const [powerReliability, setPowerReliability] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const [floodRisk, setFloodRisk] = useState('');
  const [agentFreeOnly, setAgentFreeOnly] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter(property => {
      if (selectedState && property.state !== selectedState) return false;
      if (selectedCity && property.city !== selectedCity) return false;
      if (searchArea && !property.area.toLowerCase().includes(searchArea.toLowerCase())) return false;
      if (maxRent && property.annualRent > parseInt(maxRent)) return false;
      if (maxMoveIn && property.moveInCost > parseInt(maxMoveIn)) return false;
      if (powerReliability && property.powerReliability !== powerReliability) return false;
      if (waterSource && property.waterSource !== waterSource) return false;
      if (floodRisk && property.floodRisk !== floodRisk) return false;
      if (agentFreeOnly && !property.agentFree) return false;
      return true;
    });
  }, [selectedState, selectedCity, searchArea, maxRent, maxMoveIn, powerReliability, waterSource, floodRisk, agentFreeOnly]);

  const clearFilters = () => {
    setSelectedState('');
    setSelectedCity('');
    setSearchArea('');
    setMaxRent('');
    setMaxMoveIn('');
    setPowerReliability('');
    setWaterSource('');
    setFloodRisk('');
    setAgentFreeOnly(false);
  };

  const formatCurrency = (amount: number) => {
    return `₦${(amount / 1000000).toFixed(1)}M`;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-white/80 mb-6">Please log in to access property search and listings</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">ShowRoom</Link>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition text-sm"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 flex items-center justify-between"
          >
            <span className="font-semibold">Filters</span>
            <svg className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {/* State */}
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('');
                    }}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All States</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  >
                    <option value="">All Cities</option>
                    {selectedState && CITIES[selectedState]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Area Search */}
                <div>
                  <label className="block text-sm font-medium mb-2">Area</label>
                  <input
                    type="text"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    placeholder="e.g., Lekki, Ikeja..."
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
                  />
                </div>

                {/* Max Annual Rent */}
                <div>
                  <label className="block text-sm font-medium mb-2">Max Annual Rent</label>
                  <input
                    type="number"
                    value={maxRent}
                    onChange={(e) => setMaxRent(e.target.value)}
                    placeholder="₦ 0"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
                  />
                </div>

                {/* Max Move-in Cost */}
                <div>
                  <label className="block text-sm font-medium mb-2">Max Move-in Cost</label>
                  <input
                    type="number"
                    value={maxMoveIn}
                    onChange={(e) => setMaxMoveIn(e.target.value)}
                    placeholder="₦ 0"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-white/40"
                  />
                </div>

                {/* Power Reliability */}
                <div>
                  <label className="block text-sm font-medium mb-2">Power Reliability</label>
                  <select
                    value={powerReliability}
                    onChange={(e) => setPowerReliability(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Any</option>
                    {POWER_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Water Source */}
                <div>
                  <label className="block text-sm font-medium mb-2">Water Source</label>
                  <select
                    value={waterSource}
                    onChange={(e) => setWaterSource(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Any</option>
                    {WATER_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Flood Risk */}
                <div>
                  <label className="block text-sm font-medium mb-2">Flood Risk</label>
                  <select
                    value={floodRisk}
                    onChange={(e) => setFloodRisk(e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Any</option>
                    {FLOOD_OPTIONS.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Agent-free */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="agentFree"
                    checked={agentFreeOnly}
                    onChange={(e) => setAgentFreeOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 focus:ring-2 focus:ring-purple-500"
                  />
                  <label htmlFor="agentFree" className="text-sm font-medium cursor-pointer">
                    Agent-free only
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h1>
              <p className="text-white/70">Showing available rentals in Nigeria</p>
            </div>

            {/* Property Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {filteredProperties.map(property => (
                <Link key={property.id} href={`/property/${property.id}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition cursor-pointer group">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-white/10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          <p className="text-sm text-white/70">{property.videoCount} videos</p>
                        </div>
                      </div>
                      {/* Power Badge */}
                      {property.powerReliability === '20+ hours' && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-green-600 rounded-full text-xs font-semibold flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          24/7 Power
                        </div>
                      )}
                      {property.agentFree && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 rounded-full text-xs font-semibold">
                          Agent-free
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{property.area}, {property.city}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-2xl font-bold text-purple-400">{formatCurrency(property.annualRent)}</p>
                          <p className="text-xs text-white/60">per year</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/80">{formatCurrency(property.moveInCost)}</p>
                          <p className="text-xs text-white/60">move-in cost</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>{property.bedrooms} bed</span>
                        <span>•</span>
                        <span>{property.bathrooms} bath</span>
                        <span>•</span>
                        <span className="capitalize">{property.floodRisk} flood risk</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                <p className="text-white/70 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}


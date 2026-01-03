'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">ShowRoom</h1>
          <div className="flex gap-3">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">Find Your Perfect Home in Nigeria</h2>
          <p className="text-xl text-white/80">Video-first rental platform. See before you visit.</p>
        </div>

        {/* Quick Search */}
        <div className="max-w-2xl mx-auto mb-16">
          <Link href="/search">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition cursor-pointer">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-lg text-white/60">Search by location, price, or features...</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Video Tours</h3>
            <p className="text-white/70">Watch full property videos before visiting</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Power & Utilities</h3>
            <p className="text-white/70">Filter by power reliability and water source</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Hidden Costs</h3>
            <p className="text-white/70">See total move-in costs upfront</p>
          </div>
        </div>

        {/* CTA */}
        {!isLoggedIn && (
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-3">Ready to find your home?</h3>
            <p className="text-white/90 mb-6">Sign up to access full property listings and videos</p>
            <button
              onClick={() => setIsLoggedIn(true)}
              className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-white/90 transition"
            >
              Get Started Free
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


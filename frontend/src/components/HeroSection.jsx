import React from 'react';
import { ArrowRight, MapPin, GraduationCap, Users, Trophy, Globe } from 'lucide-react';

export default function HeroSection({ onExplorePrograms, onVisitCampus }) {
  return (
    <section className="relative bg-gradient-to-b from-[#f0f6fc] via-[#f7fafc] to-[#ffffff] pt-8 sm:pt-14 pb-12 overflow-hidden">
      {/* Background soft wavy curves */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -ml-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle & CTA Buttons */}
          <div className="lg:col-span-6 z-10 space-y-6 text-left">
            {/* Playful Yellow Sparkle Doodle & Title */}
            <div className="relative inline-block">
              {/* Sparkle doodle lines radiating above Learn */}
              <div className="absolute -top-6 -left-3 text-[#f59e0b] select-none pointer-events-none animate-pulse">
                <svg width="34" height="30" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 22L1 18" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M10 13L6 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M19 8L18 2" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M27 12L31 8" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[56px] font-extrabold text-[#1b365d] tracking-tight leading-[1.12] font-serif">
                Learn. Grow. Belong.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              At Riverview College, you'll find a supportive community, 
              world-class education, and endless opportunities.
            </p>

            {/* CTA Buttons strictly matching the design */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Primary Navy Pill Button */}
              <button
                onClick={onExplorePrograms}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1b365d] hover:bg-[#112240] text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Outline Pill Button */}
              <button
                onClick={onVisitCampus}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1b365d] text-sm font-semibold rounded-full border border-[#1b365d] shadow-2xs hover:shadow-xs transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#1b365d]" />
                <span>Visit Campus</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Image with Students */}
          <div className="lg:col-span-6 relative z-10">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Hero Image Container matching the 4 smiling students in the image */}
              <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl border-4 border-white/80 aspect-[16/10] sm:aspect-[16/10]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
                  alt="Riverview College students collaborating outdoors"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b365d]/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Highlights Bar spanning across below the hero */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            
            {/* 1. Top-Ranked Programs */}
            <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-[#eef6fc] text-[#1b365d] flex items-center justify-center shrink-0 shadow-2xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-bold text-[#1b365d]">Top-Ranked</h4>
                <p className="text-xs text-slate-500">Academic Programs</p>
              </div>
            </div>

            {/* 2. Vibrant Campus Community */}
            <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-[#eef6fc] text-[#1b365d] flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-bold text-[#1b365d]">Vibrant Campus</h4>
                <p className="text-xs text-slate-500">Diverse Community</p>
              </div>
            </div>

            {/* 3. Exceptional Faculty */}
            <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-[#eef6fc] text-[#1b365d] flex items-center justify-center shrink-0 shadow-2xs">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-bold text-[#1b365d]">Exceptional</h4>
                <p className="text-xs text-slate-500">World-Class Faculty</p>
              </div>
            </div>

            {/* 4. Global Opportunities */}
            <div className="flex items-center gap-3.5 px-2 sm:px-4 pt-2 sm:pt-0">
              <div className="w-12 h-12 rounded-xl bg-[#eef6fc] text-[#1b365d] flex items-center justify-center shrink-0 shadow-2xs">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-left">
                <h4 className="text-sm sm:text-base font-bold text-[#1b365d]">Global</h4>
                <p className="text-xs text-slate-500">Exchange & Placements</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

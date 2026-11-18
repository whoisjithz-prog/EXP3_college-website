import React from 'react';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';

export default function NewsAndEventsSection({ onViewAllNews, onViewAllEvents }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column: Latest News */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1b365d] font-serif">
                Latest News
              </h2>
              <button
                onClick={onViewAllNews}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1b365d] hover:text-[#112240] group transition-colors"
              >
                <span>View All News</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* News Card strictly matching the design */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-center p-3 sm:p-4 gap-4 sm:gap-5 group cursor-pointer">
              {/* Thumbnail Image */}
              <div className="w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 relative">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
                  alt="Annual Innovation Summit"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* News Details */}
              <div className="flex-1 text-left space-y-1.5">
                <h3 className="text-base sm:text-[17px] font-bold text-slate-800 group-hover:text-[#1b365d] transition-colors leading-snug">
                  Riverview College Hosts Annual Innovation Summit
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                  Students, faculty, and industry leaders come together to shape the future.
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#1b365d]" />
                  <span>Apr 25, 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Upcoming Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1b365d] font-serif">
                Upcoming Events
              </h2>
              <button
                onClick={onViewAllEvents}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#1b365d] hover:text-[#112240] group transition-colors"
              >
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Event Card strictly matching the design */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col sm:flex-row items-center p-3 sm:p-4 gap-4 sm:gap-5 group cursor-pointer">
              {/* Thumbnail Image */}
              <div className="w-full sm:w-36 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 relative">
                <img
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80"
                  alt="Career Fair 2025"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Event Date Badge & Details */}
              <div className="flex items-start gap-4 flex-1 w-full text-left">
                {/* Date Badge */}
                <div className="bg-[#eef6fc] border border-[#d0e5f9] text-[#1b365d] rounded-xl px-3 py-2 flex flex-col items-center justify-center shrink-0 w-16 text-center shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b365d]">APR</span>
                  <span className="text-xl font-extrabold text-[#1b365d] leading-none">30</span>
                </div>

                {/* Details */}
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base sm:text-[17px] font-bold text-slate-800 group-hover:text-[#1b365d] transition-colors leading-snug">
                    Career Fair 2025
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 font-medium pt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      9:00 AM – 4:00 PM
                    </span>
                    <span className="text-slate-300 hidden sm:inline">|</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Main Campus
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Clock, Award, Users, Search, DollarSign } from 'lucide-react';

export default function CoursesModal({ API_BASE = 'http://127.0.0.1:8000', onAskInChat }) {
  const [courses, setCourses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/college/courses/`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Courses fetch error:', err);
        setLoading(false);
      });
  }, []);

  const filtered = selectedFilter === 'ALL'
    ? courses
    : courses.filter((c) => c.degree_level === selectedFilter);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left animate-fadeIn">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#1b365d] bg-[#eef6fc] px-3 py-1 rounded-full">
          Academic Excellence
        </span>
        <h2 className="text-3xl font-extrabold text-[#1b365d] mt-2 font-serif">
          Undergraduate & Postgraduate Programs
        </h2>
        <p className="text-sm text-slate-500 mt-2">
          Explore our industry-aligned degrees designed to empower future leaders, engineers, and creators.
        </p>

        {/* Filter Pills */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {['ALL', 'UG', 'PG'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedFilter === filter
                  ? 'bg-[#1b365d] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {filter === 'ALL' ? 'All Degrees' : filter === 'UG' ? 'Undergraduate (UG)' : 'Postgraduate (PG)'}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#1b365d] bg-[#eef6fc] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {course.degree_level}
                </span>
              </div>

              <h3 className="text-lg font-bold text-[#1b365d] mb-2 leading-snug">
                {course.name}
              </h3>

              <p className="text-xs text-slate-600 mb-4 line-clamp-3">
                {course.overview}
              </p>

              <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#1b365d]" />
                  <span>Duration: <strong>{course.duration}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-3.5 h-3.5 text-[#1b365d]" />
                  <span>Annual Tuition: <strong className="text-slate-800">${course.annual_fees} / yr</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#1b365d]" />
                  <span>Seats: <strong>{course.seats}</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Eligibility: {course.eligibility.substring(0, 32)}...</span>
              <button
                onClick={() => onAskInChat(`What are the fees, syllabus, and eligibility for ${course.name}?`)}
                className="text-xs font-semibold text-[#1b365d] hover:text-[#112240] hover:underline cursor-pointer"
              >
                Ask AI Assistant →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

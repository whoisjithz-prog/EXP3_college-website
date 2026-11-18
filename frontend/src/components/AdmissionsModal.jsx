import React from 'react';
import { Calendar, CheckCircle2, Award, DollarSign, HelpCircle, ArrowRight } from 'lucide-react';

export default function AdmissionsModal({ onAskInChat }) {
  const steps = [
    { num: '01', title: 'Submit Online Application', desc: 'Fill out the portal application and submit academic transcripts.' },
    { num: '02', title: 'Entrance Assessment', desc: 'Take the Riverview Entrance Assessment Test (REAT) or submit SAT/CAT scores.' },
    { num: '03', title: 'Faculty Interview', desc: 'Engage in a friendly virtual or campus interview with the program director.' },
    { num: '04', title: 'Offer & Enrollment', desc: 'Receive offer letter, apply for merit scholarships, and confirm your seat.' },
  ];

  const scholarships = [
    { title: "Riverview Merit Scholarship", waiver: "50% Tuition Waiver", desc: "For applicants with 90%+ in high school or undergraduate qualifying tests." },
    { title: "Dean's Athletic Excellence", waiver: "Up to 75% Waiver", desc: "Awarded to national and state-level competitive sports athletes." },
    { title: "Women in STEM Fellowship", waiver: "30% Tuition Concession", desc: "Dedicated grant for women pursuing AI, Computer Science, and Biotechnology." },
    { title: "Need-Based Financial Aid", waiver: "Custom Grant", desc: "Assistance covering tuition and hostel expenses based on household income." }
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left animate-fadeIn">
      {/* Banner */}
      <div className="bg-[#1b365d] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl mb-12">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-blue-200">
            Admissions 2025-2026
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif">
            Begin Your Journey at Riverview
          </h2>
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
            Join a vibrant community of thinkers, innovators, and changemakers. Applications for early decision and regular entry are open now.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => onAskInChat("How do I apply for Admissions 2025 and what are the key deadlines?")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1b365d] font-bold text-xs rounded-full shadow hover:bg-slate-100 transition-colors"
            >
              <span>Ask AI About Admissions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Steps */}
      <div className="mb-14">
        <h3 className="text-xl font-bold text-[#1b365d] mb-6 font-serif">
          Simple 4-Step Application Process
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div key={st.num} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
              <span className="text-3xl font-extrabold text-[#1b365d]/20 mb-2 block font-serif">
                {st.num}
              </span>
              <h4 className="text-sm font-bold text-[#1b365d] mb-1">{st.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scholarships */}
      <div>
        <h3 className="text-xl font-bold text-[#1b365d] mb-6 font-serif flex items-center gap-2">
          <Award className="w-5 h-5 text-[#f59e0b]" />
          Scholarships & Financial Aid
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((sch, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#eef6fc] text-[#1b365d] flex items-center justify-center shrink-0">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#1b365d]">{sch.title}</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {sch.waiver}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{sch.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import CollegeLogo from './CollegeLogo';
import { Mail, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#0f1d33] text-white pt-14 pb-8 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center p-1">
                <CollegeLogo size={32} showText={false} />
              </div>
              <div>
                <span className="font-bold text-lg font-serif tracking-tight">Riverview College</span>
                <p className="text-[11px] text-blue-300">Excellence in Higher Education Since 1984</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Riverview College is an autonomous institution accredited with NAAC 'A++' and ABET. 
              Motto: "Learn. Grow. Belong." Empowering world-class leaders and innovators.
            </p>

            <div className="text-xs text-slate-300 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>100 Riverside Boulevard, Tech Valley, CA 94016</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>+1 (800) 555-RIVE (7483)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>admissions@riverview.edu | info@riverview.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Academics</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">Computer Science</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">AI & Data Science</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">Business School (MBA/BBA)</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">Digital Journalism</button></li>
              <li><button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors">Biotechnology</button></li>
            </ul>
          </div>

          {/* Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Admissions</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Admissions 2025-26</button></li>
              <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Tuition & Fee Structure</button></li>
              <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Merit Scholarships</button></li>
              <li><button onClick={() => onNavigate('admissions')} className="hover:text-white transition-colors">Campus Tour Booking</button></li>
              <li><button onClick={() => onNavigate('chat')} className="hover:text-white transition-colors">Ask AI Assistant</button></li>
            </ul>
          </div>

          {/* Campus & Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300">Working Hours</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200">Admissions Desk:</p>
                  <p>Mon – Fri: 9:00 AM – 5:00 PM</p>
                  <p>Saturday: 10:00 AM – 2:00 PM</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Student Hostels & 24/7 Library open throughout semester terms.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Riverview College. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>AI Assistant Guidelines</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

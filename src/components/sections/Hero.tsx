import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { OptimizedImage } from '../ui/OptimizedImage';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const highlights = [
  { icon: ShieldCheck, label: 'Made to your brief' },
  { icon: Sparkles, label: 'In-house fabrication' },
  { icon: Truck, label: 'Delivery across India' },
];

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => (
  <section id="home" className="relative isolate overflow-hidden bg-[#f7f6f3] dark:bg-gray-950 pt-28 sm:pt-32 lg:pt-36">
    <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-indigo-200/50 blur-3xl dark:bg-indigo-900/20" />
    <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-amber-100/70 blur-3xl dark:bg-violet-900/10" />
    <div className="container relative mx-auto grid items-center gap-10 px-4 pb-14 sm:px-6 md:pb-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 lg:px-8 lg:pb-24">
      <div className="max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[.16em] text-indigo-700 shadow-sm dark:border-indigo-800 dark:bg-gray-900/80 dark:text-indigo-300">
          <Sparkles size={14} /> Custom-made. Thoughtfully crafted.
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .06 }}
          className="max-w-2xl text-[2.8rem] font-black leading-[.98] tracking-[-.055em] text-gray-950 dark:text-white sm:text-6xl lg:text-[4.35rem]">
          Your ideas,<br />
          <span className="text-indigo-600 dark:text-indigo-400">made tangible.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .14 }}
          className="mt-6 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg sm:leading-8">
          Personalised acrylic gifts, statement wall decor and custom business signage — designed and fabricated with care in Hyderabad.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .22 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => onNavigate('catalogue')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300">
            Explore the collection <ArrowRight size={17} />
          </button>
          <button onClick={() => onNavigate('main')}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white/80 px-7 py-3 text-sm font-bold text-gray-800 transition hover:border-indigo-300 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-100 dark:hover:border-indigo-500"
            >
            <MessageCircle size={17} /> Start a custom project
          </button>
        </motion.div>
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-gray-200 pt-6 dark:border-gray-800">
          {highlights.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <Icon size={15} className="text-indigo-600 dark:text-indigo-400" /> {label}
            </div>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .75, delay: .12 }}
        className="relative mx-auto w-full max-w-[620px]">
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-200/70 via-white/20 to-amber-100/70 blur-xl dark:from-indigo-900/30 dark:to-violet-900/20" />
        <div className="relative grid grid-cols-[1.12fr_.88fr] grid-rows-2 gap-3 sm:gap-4">
          <div className="row-span-2 overflow-hidden rounded-[1.6rem] bg-gray-200 shadow-xl shadow-gray-900/10 dark:bg-gray-800">
            <OptimizedImage src="/images/trending/project-1.jpg" alt="Custom acrylic and wall decor creation" width={900} className="h-full min-h-[330px] w-full object-cover sm:min-h-[470px]" />
          </div>
          <div className="overflow-hidden rounded-[1.4rem] bg-gray-200 shadow-lg dark:bg-gray-800">
            <OptimizedImage src="/images/gallery/gallery-3.jpg" alt="Personalised gift and photo frame" width={600} className="h-full min-h-[155px] w-full object-cover sm:min-h-[225px]" />
          </div>
          <div className="relative overflow-hidden rounded-[1.4rem] bg-gray-200 shadow-lg dark:bg-gray-800">
            <OptimizedImage src="/images/led-decor/a.jpg" alt="Illuminated custom decor" width={600} className="h-full min-h-[155px] w-full object-cover sm:min-h-[225px]" />
            <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/90 px-3 py-2 backdrop-blur dark:bg-gray-950/85">
              <p className="text-[10px] font-bold uppercase tracking-[.15em] text-indigo-700 dark:text-indigo-300">Designed around you</p>
              <p className="mt-0.5 text-xs font-semibold text-gray-900 dark:text-white">One idea at a time.</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-xl dark:border-gray-700 dark:bg-gray-900/95 sm:-left-6 sm:px-5">
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-gray-500 dark:text-gray-400">From concept to creation</p>
          <p className="mt-1 text-sm font-black text-gray-900 dark:text-white">Custom work, made personal.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

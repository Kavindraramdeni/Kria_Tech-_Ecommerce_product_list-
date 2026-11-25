import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BriefcaseBusiness, Gift, Lightbulb, Puzzle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../components/ui/OptimizedImage';
import { SEO } from '../components/shared/SEO';

const categories = [
  {
    eyebrow: 'For homes & spaces',
    title: 'Wall decor & LED art',
    description: 'Make a statement with layered MDF art, illuminated pieces and custom wall installations.',
    image: '/images/led-decor/a.jpg',
    href: '/signature-wall-decor',
    icon: Lightbulb,
    tag: 'Decor',
  },
  {
    eyebrow: 'For memories & moments',
    title: 'Personalised gifts',
    description: 'Photo frames, magnetic keepsakes and thoughtful acrylic gifts made around your memories.',
    image: '/images/polaroids/heritage-set.jpg',
    href: '/personalized-gifts',
    icon: Gift,
    tag: 'Personalise',
  },
  {
    eyebrow: 'For brands & businesses',
    title: 'Custom signage',
    description: 'Acrylic lettering, display signs and branded pieces for shops, offices and events.',
    image: '/images/led-decor/logo-sign.jpg',
    href: '/custom-signs',
    icon: BriefcaseBusiness,
    tag: 'Business',
  },
  {
    eyebrow: 'For curious young minds',
    title: 'Kids learning',
    description: 'Hands-on puzzles and engaging learning products designed to make discovery fun.',
    image: '/images/kids/light-box.jpg',
    href: '/educational-kids',
    icon: Puzzle,
    tag: 'Learn',
  },
];

export const CataloguePage: React.FC = () => (
  <div className="min-h-screen bg-[#f7f6f3] pb-20 pt-28 dark:bg-gray-950 sm:pt-32">
    <SEO
      title="Custom Product Catalogue"
      description="Explore KRIA Tech's personalised acrylic gifts, magnetic photo frames, custom signage, LED wall decor and kids learning products."
      canonical="/catalogue"
    />
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[.18em] text-indigo-700 dark:border-indigo-800 dark:bg-gray-900 dark:text-indigo-300">
          <Sparkles size={13} /> Explore what we make
        </span>
        <h1 className="mt-6 text-4xl font-black tracking-[-.05em] text-gray-950 dark:text-white sm:text-6xl">
          Made for your <span className="text-indigo-600 dark:text-indigo-400">kind of idea.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400 sm:text-lg">
          Browse our collections, find a starting point and tell us how you would like to make it yours.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <motion.article
              key={category.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: .45, delay: index * .06 }}
              className="group overflow-hidden rounded-[1.7rem] border border-gray-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
            >
              <Link to={category.href} className="grid h-full grid-cols-1 sm:grid-cols-[.92fr_1.08fr]">
                <div className="relative min-h-56 overflow-hidden bg-gray-100 dark:bg-gray-800 sm:min-h-[310px]">
                  <OptimizedImage src={category.image} alt={category.title} width={800} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-800 backdrop-blur dark:bg-gray-950/85 dark:text-white">{category.tag}</span>
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-7 lg:p-9">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    <Icon size={20} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[.17em] text-indigo-600 dark:text-indigo-400">{category.eyebrow}</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-950 dark:text-white sm:text-3xl">{category.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{category.description}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-indigo-700 transition group-hover:gap-3 dark:text-indigo-300">
                    Explore collection <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>

      <section className="mt-12 rounded-[1.7rem] bg-gray-950 px-6 py-10 text-center text-white sm:mt-16 sm:px-12 sm:py-14 dark:bg-indigo-950">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-indigo-300">Have something different in mind?</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">Let's make a product around your idea.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-300">Share a reference, size or quantity. Our team can help you work out the right material and finish.</p>
        <Link to="/#contact" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-gray-950 transition hover:bg-indigo-100">
          Discuss a custom project <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  </div>
);

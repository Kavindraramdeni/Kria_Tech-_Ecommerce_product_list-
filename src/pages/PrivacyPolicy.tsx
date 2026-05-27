import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-bold mb-8 transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-gray-100 dark:border-gray-800"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Privacy Policy</h1>
          </div>

          <div className="prose prose-indigo dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Introduction</h2>
              <p>Welcome to Kria Tech. We value your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Data We Collect</h2>
              <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. How We Use Your Data</h2>
              <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service.</li>
                <li>To notify you about changes to our Service.</li>
                <li>To provide customer support.</li>
                <li>To gather analysis or valuable information so that we can improve our Service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Data Security</h2>
              <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p className="font-bold text-indigo-600">Srikrishna609@gmail.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

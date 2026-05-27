import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsOfService = () => {
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
              <FileText size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Terms of Service</h1>
          </div>

          <div className="prose prose-indigo dark:prose-invert max-w-none space-y-8 text-gray-600 dark:text-gray-400">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
              <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Use of Service</h2>
              <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Intellectual Property</h2>
              <p>The Service and its original content, features and functionality are and will remain the exclusive property of Kria Tech and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Kria Tech.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Limitation of Liability</h2>
              <p>In no event shall Kria Tech, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Changes</h2>
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="font-bold text-indigo-600">Srikrishna609@gmail.com</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

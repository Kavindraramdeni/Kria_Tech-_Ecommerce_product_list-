import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageSquare, Clock, Send, Sparkles, Loader2, AlertCircle, Compass, MapPin, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, CONTACT_SERVICES } from '../../constants/contact';
import { Button } from '../ui/Button';
import { useToastContext } from '../../context/ToastContext';
import { trackEvent } from '../../utils/analytics';

export const Contact: React.FC = () => {
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    service: '',
    details: ''
  });
  const [errors, setErrors] = useState<{ service?: string; details?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as 'service' | 'details']) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.service) {
      setErrors({ service: 'Please select a service required.' });
      return;
    }

    setIsSubmitting(true);

    try {
      trackEvent('Contact', 'WhatsApp Click', formData.service);

      // Build WhatsApp URL with the selections
      const serviceSegment = `Service Required: ${formData.service}`;
      const detailsSegment = formData.details.trim() ? `Project Details: ${formData.details.trim()}` : 'Please contact me to discuss details.';
      const whatsappMsg = `Hello Kria Tech! I would like to get a custom quote.%0A%0A*${serviceSegment}*%0A%0A*${detailsSegment}*`;
      const whatsappUrl = `https://wa.me/919000376792?text=${encodeURIComponent(whatsappMsg.replace(/%0A/g, '\n'))}`;

      // Open in same or new window (new tab is best)
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      showToast('Opening WhatsApp for your quote...', 'success');
      setFormData({ service: '', details: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const InputError = ({ message }: { message?: string }) => (
    message ? (
      <motion.p 
        initial={{ opacity: 0, y: -5 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-[10px] text-red-500 font-bold mt-1 flex items-center gap-1"
      >
        <AlertCircle size={10} /> {message}
      </motion.p>
    ) : null
  );

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ... previous background markup ... */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/services/personalized-gifts.jpg" 
          alt="Personalised gifts and custom photo products from KRIA Tech" 
          className="w-full h-full object-cover opacity-10 dark:opacity-20" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-transparent to-gray-50 dark:from-gray-950 dark:via-transparent dark:to-gray-950"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            Get a <span className="text-indigo-600">Quote</span>
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Ready to bring your vision to life? Tell us what you need and get an instant quote on WhatsApp within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white dark:bg-gray-900 p-5 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Redirected!</h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Redirected to WhatsApp. If the tab did not open, please check if your browser blocked popups.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline mt-4"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <label htmlFor="service" className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Service Required *</label>
                    <div className="relative">
                      <select 
                        name="service" 
                        id="service" 
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full bg-gray-50 dark:bg-gray-800 border-2 select-text text-gray-900 dark:text-white rounded-2xl py-3 md:py-4 px-6 transition-all outline-none font-bold appearance-none cursor-pointer ${errors.service ? 'border-red-500/50' : 'border-transparent focus:border-indigo-600'}`}
                      >
                        <option value="">Select a service</option>
                        {CONTACT_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                        <MessageSquare size={16} />
                      </div>
                    </div>
                    <InputError message={errors.service} />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="details" className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest pl-1">Project Details (Optional)</label>
                    <textarea 
                      name="details" 
                      id="details" 
                      rows={4} 
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Describe your requirements in detail (e.g. quantity, size, design preferences)..." 
                      className="w-full bg-gray-50 dark:bg-gray-800 border-2 rounded-2xl py-3 md:py-4 px-6 transition-all outline-none font-bold dark:text-white resize-none border-transparent focus:border-indigo-600"
                    ></textarea>
                  </div>

                  <Button 
                    variant="primary"
                    size="xl"
                    isLoading={isSubmitting}
                    leftIcon={!isSubmitting && <Send size={20} />}
                    type="submit" 
                    className="w-full font-black uppercase tracking-widest"
                  >
                      {isSubmitting ? 'Opening WhatsApp...' : 'Get Instant Quote on WhatsApp'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Studio Location Card */}
            <div className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter uppercase flex items-center gap-2">
                <Compass className="text-indigo-600 animate-spin" size={20} /> Studio Location
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="bg-indigo-50 dark:bg-indigo-900/40 p-2.5 rounded-xl text-indigo-600 dark:text-indigo-400 mt-1">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Main Fabrication Plant</h4>
                    <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight mt-0.5">Aditya Nagar, Hyderabad</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 tracking-wide leading-relaxed font-semibold">
                      Our main production hub equipped with high-powered CO2 laser modules, heavy CNC routers, and high-volume custom MDF finishing rooms.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-950 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                  <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" /> Open Now (Closes 8 PM)
                  </span>
                  <a
                    href="https://maps.app.goo.gl/mLrJyvoQJzJnBvZw9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                  >
                    Navigate <ExternalLink size={10} />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-4 md:mb-6 tracking-tighter uppercase">Direct Connections</h3>
              <div className="space-y-4">
                <motion.a 
                  whileHover={{ x: 6 }}
                  href={`tel:${CONTACT_INFO.phoneRaw}`} 
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Call Directly</h4>
                    <p className="text-sm font-black text-gray-900 dark:text-white">{CONTACT_INFO.phone}</p>
                  </div>
                </motion.a>

                <motion.a 
                  whileHover={{ x: 6 }}
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Send Email</h4>
                    <p className="text-sm font-black text-gray-900 dark:text-white">{CONTACT_INFO.email}</p>
                  </div>
                </motion.a>

                <motion.a 
                  whileHover={{ x: 6 }}
                  href={CONTACT_INFO.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 group"
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-3 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">WhatsApp Support</h4>
                    <p className="text-sm font-black text-gray-900 dark:text-white">Live Workspace Chat</p>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
;
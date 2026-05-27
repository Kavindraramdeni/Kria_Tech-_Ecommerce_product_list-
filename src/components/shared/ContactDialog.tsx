import React, { FormEvent, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, FileText, ChevronDown, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { CONTACT_SERVICES, CONTACT_INFO } from '../../constants/contact';
import { Button } from '../ui/Button';
import { useToastContext } from '../../context/ToastContext';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({ isOpen, onClose, initialService }) => {
  const { showToast } = useToastContext();
  const [formData, setFormData] = useState({
    service: initialService || '',
    details: ''
  });
  const [errors, setErrors] = useState<{ service?: string; details?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ service: initialService || '', details: '' });
      setErrors({});
      setIsSubmitted(false);
    }
  }, [isOpen, initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as 'service' | 'details']) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.service) {
      setErrors({ service: 'Please select a service required.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build WhatsApp URL with the selections
      const serviceSegment = `Service Required: ${formData.service}`;
      const detailsSegment = formData.details.trim() ? `Project Details: ${formData.details.trim()}` : 'Please contact me to discuss details.';
      const whatsappMsg = `Hello Kria Tech! I would like to get a custom quote.%0A%0A*${serviceSegment}*%0A%0A*${detailsSegment}*`;
      const whatsappUrl = `https://wa.me/919000376792?text=${encodeURIComponent(whatsappMsg.replace(/%0A/g, '\n'))}`;

      // Open in same or new window (new tab is best)
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      showToast('Opening WhatsApp for your quote...', 'success');
      
      setTimeout(() => {
        setIsSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }, 3000);
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 md:p-10 relative z-10 border border-gray-100 dark:border-gray-800 no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full z-20"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            <div className="mb-6 md:mb-8 pr-8">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-tight">Request a quote</h2>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1 md:mt-2">Get an instant quote from our team directly on WhatsApp.</p>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 md:py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto">
                  <Send size={32} />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Success!</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">Redirected to WhatsApp. If the tab did not open, please check if popups are enabled.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="space-y-1.5">
                  <label htmlFor="dialog-service" className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    <Sparkles size={12} className="mr-2" />
                    Service Required *
                  </label>
                  <div className="relative">
                    <select 
                      name="service" 
                      id="dialog-service" 
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full bg-gray-50 dark:bg-gray-800 border-2 text-gray-900 dark:text-white rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 focus:ring-2 focus:ring-indigo-500 transition-all outline-none appearance-none text-sm md:text-base font-bold ${errors.service ? 'border-red-500/50' : 'border-transparent'}`}
                    >
                      <option value="">Select a service</option>
                      {CONTACT_SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                  <InputError message={errors.service} />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dialog-details" className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    <FileText size={12} className="mr-2" />
                    Project Details (Optional)
                  </label>
                  <textarea 
                    name="details" 
                    id="dialog-details" 
                    rows={4} 
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe your requirements (e.g. quantity, size, colors)..." 
                    className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent rounded-xl md:rounded-2xl py-3 md:py-4 px-4 md:px-5 transition-all outline-none resize-none text-sm md:text-base font-bold dark:text-white focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <Button 
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  leftIcon={!isSubmitting && <Send size={16} />}
                  type="submit" 
                  className="w-full"
                >
                  {isSubmitting ? 'Opening WhatsApp...' : 'Get Quote on WhatsApp'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
;
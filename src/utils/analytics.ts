import ReactGA from 'react-ga4';

// Replace with a real GA4 Measurement ID in production via env var
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';

export const initGA = () => {
  if (import.meta.env.PROD) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }
};

export const trackPageView = (path: string) => {
  if (import.meta.env.PROD) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  if (import.meta.env.PROD) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } else {
    console.log(`[Analytics Event] ${category} | ${action} | ${label || ''} | ${value || ''}`);
  }
};

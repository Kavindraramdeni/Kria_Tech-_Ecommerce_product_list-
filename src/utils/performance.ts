export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    }).catch(err => {
      console.warn('Web vitals library not found or failed to load', err);
    });
  }
};

export const logPerformance = (metric: any) => {
  const { name, value, id } = metric;
  console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (ID: ${id})`);
  
  // In a real app, you'd send this to an analytics endpoint
  // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(metric) });
};

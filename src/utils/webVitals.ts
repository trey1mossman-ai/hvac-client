import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Web Vitals targets
const TARGETS = {
  LCP: 2500,  // Largest Contentful Paint - target under 2.5s
  FID: 100,   // First Input Delay - target under 100ms
  CLS: 0.1,   // Cumulative Layout Shift - target under 0.1
  FCP: 1800,  // First Contentful Paint - target under 1.8s
  TTFB: 800,  // Time to First Byte - target under 800ms
};

// Log metrics to console in development
const logMetric = (metric: Metric) => {
  const target = TARGETS[metric.name as keyof typeof TARGETS];
  const status = metric.value <= target ? '✅' : '⚠️';
  
  console.log(
    `${status} ${metric.name}: ${metric.value.toFixed(2)}${
      metric.name === 'CLS' ? '' : 'ms'
    } (target: ${target}${metric.name === 'CLS' ? '' : 'ms'})`
  );
};

// Send metrics to analytics (can be replaced with actual analytics service)
const sendToAnalytics = (metric: Metric) => {
  // In production, send to your analytics service
  if (process.env.NODE_ENV === 'production') {
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
      });
    }
    
    // Or send to custom endpoint
    // fetch('/api/metrics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: metric.name,
    //     value: metric.value,
    //     id: metric.id,
    //     timestamp: Date.now(),
    //   }),
    // });
  } else {
    // Log in development
    logMetric(metric);
  }
};

// Initialize web vitals monitoring
export function initWebVitals() {
  // Core Web Vitals
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  onFID(sendToAnalytics);  // First Input Delay
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  
  // Additional metrics
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
  
  // Log initialization in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('📊 Web Vitals monitoring initialized');
    console.log('Targets:', TARGETS);
  }
}

// Report handler for React error boundaries
export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
}
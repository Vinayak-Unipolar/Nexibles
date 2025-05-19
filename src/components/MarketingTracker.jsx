'use client';

import React, { useEffect, useCallback } from 'react';

function MarketingTracker({ metaPixelId }) {
  // Meta Pixel: Send Purchase Event (Optional)
  const sendMetaPurchaseEvent = async () => {
    const eventData = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      user_data: {
        em: ['7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068'],
        ph: [null],
      },
      attribution_data: {
        attribution_share: '0.3',
      },
      custom_data: {
        currency: 'USD',
        value: '142.52',
      },
      original_event_data: {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
      },
    };

    try {
      const response = await fetch('/api/send-meta-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pixelId: metaPixelId, eventData }),
      });
      const result = await response.json();
      if (response.ok) {
        //console.log('Meta event sent:', result);
      } else {
        console.error('Meta event error:', result);
      }
    } catch (error) {
      console.error('Meta network error:', error);
    }
  };

  // Google Ads: Load gtag.js
  const loadGtag = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=AW-17014026366"]`)) {
        resolve();
        return;
      }
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17014026366';
      gtagScript.onload = resolve;
      gtagScript.onerror = reject;
      document.head.appendChild(gtagScript);
    });
  };

  // Google Ads: Conversion Tracking Function
  const gtagReportConversion = useCallback((sendTo, url) => {
    const tryGtag = (attempts = 10, delay = 100) => {
      if (typeof window.gtag !== 'function') {
        if (attempts <= 0) {
          console.error(`Google gtag not initialized after retries for ${sendTo}`);
          return false;
        }
        console.warn(`Google gtag not ready for ${sendTo}, retrying...`);
        setTimeout(() => tryGtag(attempts - 1, delay), delay);
        return false;
      }
      console.log(`Sending conversion: ${sendTo}`);
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        event_callback: () => {
          console.log(`Conversion sent successfully: ${sendTo}`);
          if (typeof url !== 'undefined') {
            window.location = url;
          }
        },
      });
      return false;
    };
    return tryGtag();
  }, []);

  // Conversion handlers
  const trackQuoteForm = (url) => gtagReportConversion('AW-17014026366/T9rTCODv-MYaEP7g9bA_', url);
  const trackSignUpForm = (url) => gtagReportConversion('AW-17014026366/6bz-COPv-MYaEP7g9bA_', url);
  const trackWhatsAppChat = (url) => gtagReportConversion('AW-17014026366/fCTNCObv-MYaEP7g9bA_', url);

  useEffect(() => {
    // Meta Pixel Initialization
    if (metaPixelId) {
      !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', metaPixelId);
      window.fbq('track', 'PageView');
      // Uncomment to trigger Meta Purchase event on mount
      // sendMetaPurchaseEvent();
    }

    // Google Tag Initialization
    loadGtag()
      .then(() => {
        if (!document.querySelector('script[data-gtag-config]')) {
          const gtagConfigScript = document.createElement('script');
          gtagConfigScript.setAttribute('data-gtag-config', 'true');
          gtagConfigScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17014026366');
          `;
          document.head.appendChild(gtagConfigScript);
        }
      })
      .catch((error) => {
        console.error('Failed to load gtag.js:', error);
      });

    // Expose conversion handlers globally
    window.trackQuoteForm = trackQuoteForm;
    window.trackSignUpForm = trackSignUpForm;
    window.trackWhatsAppChat = trackWhatsAppChat;

    // No cleanup to ensure tracking persistence
  }, [metaPixelId, trackQuoteForm, trackSignUpForm, trackWhatsAppChat]);

  return <div style={{ display: 'none' }}>Marketing Tracker</div>;
}

export default MarketingTracker;

// Export conversion handlers
export const trackQuoteForm = (url) => window.trackQuoteForm?.(url);
export const trackSignUpForm = (url) => window.trackSignUpForm?.(url);
export const trackWhatsAppChat = (url) => window.trackWhatsAppChat?.(url);













// 'use client';

// import React, { useEffect, useCallback } from 'react';

// function MarketingTracker({ metaPixelId }) {
//   // Meta Pixel: Send Purchase Event
//   const sendMetaPurchaseEvent = async () => {
//     const eventData = {
//       event_name: 'Purchase',
//       event_time: Math.floor(Date.now() / 1000),
//       action_source: 'website',
//       user_data: {
//         em: ['7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068'],
//         ph: [null],
//       },
//       attribution_data: {
//         attribution_share: '0.3',
//       },
//       custom_data: {
//         currency: 'USD',
//         value: '142.52',
//       },
//       original_event_data: {
//         event_name: 'Purchase',
//         event_time: Math.floor(Date.now() / 1000),
//       },
//     };

//     try {
//       const response = await fetch('/api/send-meta-event', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ pixelId: metaPixelId, eventData }),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         console.log('Meta event sent:', result);
//       } else {
//         console.error('Meta event error:', result);
//       }
//     } catch (error) {
//       console.error('Meta network error:', error);
//     }
//   };

//   // Google Ads: Conversion Tracking Function
//   const gtagReportConversion = useCallback((sendTo, url) => {
//     if (typeof window.gtag !== 'function') {
//       console.error('Google gtag not initialized');
//       return false;
//     }
//     window.gtag('event', 'conversion', {
//       send_to: sendTo,
//       event_callback: () => {
//         if (typeof url !== 'undefined') {
//           window.location = url;
//         }
//       },
//     });
//     return false;
//   }, []);

//   // Conversion handlers
//   const trackQuoteForm = (url) => gtagReportConversion('AW-17014026366/T9rTCODv-MYaEP7g9bA_', url);
//   const trackSignUpForm = (url) => gtagReportConversion('AW-17014026366/6bz-COPv-MYaEP7g9bA_', url);
//   const trackWhatsAppChat = (url) => gtagReportConversion('AW-17014026366/fCTNCObv-MYaEP7g9bA_', url);

//   useEffect(() => {
//     // Meta Pixel Initialization
//     !(function (f, b, e, v, n, t, s) {
//       if (f.fbq) return;
//       n = f.fbq = function () {
//         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//       };
// if (!f._fbq) f._fbq = n;
//       n.push = n;
//       n.loaded = !0;
//       n.version = '2.0';
//       n.queue = [];
//       t = b.createElement(e);
//       t.async = !0;
//       t.src = v;
//       s = b.getElementsByTagName(e)[0];
//       s.parentNode.insertBefore(t, s);
//     })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
//     fbq('init', metaPixelId);
//     fbq('track', 'PageView');
//     sendMetaPurchaseEvent();

//     // Google Tag Initialization
//     const gtagScript = document.createElement('script');
//     gtagScript.async = true;
//     gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17014026366';
//     document.head.appendChild(gtagScript);

//     const gtagConfigScript = document.createElement('script');
//     gtagConfigScript.innerHTML = `
//       window.dataLayer = window.dataLayer || [];
//       function gtag(){dataLayer.push(arguments);}
//       gtag('js', new Date());
//       gtag('config', 'AW-17014026366');
//     `;
//     document.head.appendChild(gtagConfigScript);

//     // Expose conversion handlers globally
//     window.trackQuoteForm = trackQuoteForm;
//     window.trackSignUpForm = trackSignUpForm;
//     window.trackWhatsAppChat = trackWhatsAppChat;

//     // Cleanup
//     return () => {
//       if (document.head.contains(gtagScript)) document.head.removeChild(gtagScript);
//       if (document.head.contains(gtagConfigScript)) document.head.removeChild(gtagConfigScript);
//     };
//   }, [metaPixelId, trackQuoteForm, trackSignUpForm, trackWhatsAppChat]);

//   return <div style={{ display: 'none' }}>Marketing Tracker</div>;
// }

// export default MarketingTracker;

// // Export conversion handlers
// export const trackQuoteForm = (url) => window.trackQuoteForm?.(url);
// export const trackSignUpForm = (url) => window.trackSignUpForm?.(url);
// export const trackWhatsAppChat = (url) => window.trackWhatsAppChat?.(url);
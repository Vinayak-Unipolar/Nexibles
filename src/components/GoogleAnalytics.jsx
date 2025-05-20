// app/components/GoogleAnalytics.jsx
import Script from 'next/script';

export default function GoogleAnalytics() {
  return (
    <>
      {/* Google Analytics gtag.js */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZTW2HWBK9E"
        onError={() => console.error('Failed to load Google Analytics gtag.js')}
      />
      {/* Google Ads gtag.js */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=AW-17014026366"
        onError={() => console.error('Failed to load Google Ads gtag.js')}
      />
      {/* Google Analytics and Ads Initialization */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZTW2HWBK9E'); // Google Analytics
            gtag('config', 'AW-17014026366'); // Google Ads
          `,
        }}
      />
      {/* Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '704750105429204'); // Replace with your Pixel ID
            fbq('track', 'PageView');
          `,
        }}
        onError={() => console.error('Failed to load Facebook Pixel')}
      />
    </>
  );
}
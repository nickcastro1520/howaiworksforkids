import Script from "next/script";
import { GA_ID } from "@/lib/analytics";

/**
 * Kid-safe GA4: only rendered when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * - Consent defaults deny all ad storage / ad user data / ad personalization.
 * - Google signals and ad personalization signals are off; IP anonymization requested.
 * - No user IDs, no custom dimensions with personal data.
 */
export function Analytics() {
  if (!GA_ID) return null;

  const consent = JSON.stringify({
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  const config = JSON.stringify({
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  return (
    <>
      <Script id="ga-setup" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',${consent});gtag('set','ads_data_redaction',true);gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)},${config});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}

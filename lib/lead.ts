// Direct CRM connection — leads are posted from the browser straight to the Privyr webhook (static site, no backend).

export interface LeadFormData {
  name?: string;
  email?: string;
  phone: string;
  unitType?: string;
  offer?: string;
  enquiryFor?: string;
  message?: string;
  source?: string;
}

export interface LeadSubmitResult {
  success: boolean;
  message: string;
  privyrStatus?: string;
}

export const DEFAULT_PRIVYR_WEBHOOK_URL = 'https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/bKY9JFdX';
const PRIVYR_WEBHOOK_URL = (process.env.NEXT_PUBLIC_PRIVYR_WEBHOOK_URL || DEFAULT_PRIVYR_WEBHOOK_URL).split('#')[0];

type Win = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; gtag_report_conversion?: () => void };

export async function submitLeadToPrivyr(data: LeadFormData): Promise<LeadSubmitResult> {
  const leadPayload = {
    name: data.name?.trim() || 'Anonymous Lead',
    email: data.email?.trim() || '',
    phone: data.phone?.trim() || '',
    lead_source: data.source || 'Vertex Autograph Website',
    other_fields: {
      Project: 'Vertex Autograph',
      Developer: 'Vertex Homes Pvt. Ltd.',
      Location: 'Gopanpally, Hyderabad, Telangana 500046',
      City: 'Hyderabad',
      State: 'Telangana',
      'Unit Type': data.unitType || 'Not decided yet',
      Offer: data.offer || 'Advise me',
      'Enquiry For': data.enquiryFor || 'General enquiry',
      Message: data.message || 'Enquiry from Vertex Autograph website',
      'Page URL': typeof window !== 'undefined' ? window.location.href : '',
    },
  };
  const body = JSON.stringify(leadPayload);

  let isSuccess = false;

  // 1. Standard JSON POST to the Privyr webhook
  try {
    const res = await fetch(PRIVYR_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    const text = await res.text();
    let json: { success?: boolean } | null = null;
    try {
      json = JSON.parse(text);
    } catch {
      // non-JSON response
    }
    if (res.ok || json?.success) isSuccess = true;
  } catch (err) {
    console.warn('Privyr JSON request blocked (likely CORS) — retrying as simple request:', err);
  }

  // 2. Fallback: CORS-safe "simple" request (no preflight). Response is opaque, so a completed send counts as success.
  if (!isSuccess) {
    try {
      await fetch(PRIVYR_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body,
        keepalive: true,
      });
      isSuccess = true;
    } catch (directErr) {
      console.error('Direct Privyr submission failed:', directErr);
    }
  }

  if (!isSuccess) {
    return { success: false, message: 'Failed to submit enquiry. Please try again or call us directly.' };
  }

  // Conversion tracking (Google Tag Manager / Google Ads) — fires only if the tags are installed
  if (typeof window !== 'undefined') {
    const w = window as Win;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'vertex_form_success',
      event_category: 'Lead',
      event_action: 'Submit Enquiry Form',
      unit_type: data.unitType || 'Not Specified',
      offer: data.offer || 'Not Specified',
      lead_source: data.source || 'Vertex Autograph Website',
    });
    if (typeof w.gtag === 'function') {
      w.gtag('event', 'generate_lead', { event_category: 'Engagement', event_label: data.unitType || 'Vertex Autograph Lead', value: 1.0, currency: 'INR' });
      const sendTo = process.env.NEXT_PUBLIC_GADS_SEND_TO;
      if (sendTo) w.gtag('event', 'conversion', { send_to: sendTo, value: 1.0, currency: 'INR' });
    }
    if (typeof w.gtag_report_conversion === 'function') {
      try {
        w.gtag_report_conversion();
      } catch {
        // ignore
      }
    }
  }

  return { success: true, message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.', privyrStatus: 'success' };
}

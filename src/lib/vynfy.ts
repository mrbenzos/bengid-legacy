/**
 * Vynfy SMS Gateway Integration (https://vynfy.com)
 * Handles transactional OTPs, order alerts, and lead notifications for Bengid Legacy Ghana
 */

export interface VynfySMSResponse {
  success: boolean;
  data?: {
    task_id?: string;
    status?: string;
    message?: string;
    recipients_count?: number;
    total_credits_used?: number;
  };
  balance?: {
    deducted?: number;
    remaining?: number;
  };
  error?: string;
}

/**
 * Normalizes Ghanaian and international phone numbers into the format expected by Vynfy (e.g., 233XXXXXXXXX)
 */
export function formatGhanaPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Strip all non-digit characters
  let cleaned = phone.replace(/\D/g, '');

  // If starts with 0 (e.g. 0205761698, 024XXXXXXX, 027XXXXXXX, 050XXXXXXX, 055XXXXXXX), replace leading 0 with 233
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return '233' + cleaned.substring(1);
  }

  // If already 233... (e.g. 233205761698), return as is
  if (cleaned.startsWith('233') && cleaned.length === 12) {
    return cleaned;
  }

  // If 9 digits without leading 0 (e.g. 205761698), prepend 233
  if (cleaned.length === 9) {
    return '233' + cleaned;
  }

  return cleaned;
}

/**
 * Sends an SMS message via Vynfy API
 * @param to Single phone number or array of phone numbers
 * @param message Text message content to deliver
 */
export async function sendSMS(to: string | string[], message: string): Promise<boolean> {
  try {
    const apiKey = process.env.VYNFY_API_KEY || '167bbc54e5a452c0702ac23d3513dd67';
    const sender = process.env.VYNFY_SENDER_ID || 'BenGid';
    const apiUrl = process.env.VYNFY_API_URL || 'https://sms.vynfy.com/api/v1/send';

    if (!apiKey) {
      console.error('[VYNFY SMS] Missing API key in environment variables.');
      return false;
    }

    const rawRecipients = Array.isArray(to) ? to : [to];
    const recipients = rawRecipients
      .map(formatGhanaPhoneNumber)
      .filter((phone) => phone.length >= 9);

    if (recipients.length === 0) {
      console.warn('[VYNFY SMS] No valid phone numbers provided to send SMS.');
      return false;
    }

    const payload = {
      sender,
      recipients,
      message,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data: VynfySMSResponse = await response.json();

    if (!response.ok || !data.success) {
      console.error('[VYNFY SMS] Send failed:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error || data.data?.message,
      });
      return false;
    }

    console.log(`[VYNFY SMS] Delivered successfully to ${recipients.join(', ')} (Sender: ${sender}, Credits Remaining: ${data.balance?.remaining ?? 'N/A'})`);
    return true;
  } catch (error) {
    console.error('[VYNFY SMS] Error sending SMS:', error);
    return false;
  }
}

import { sendSMS as vynfySendSMS } from './vynfy';

/**
 * Backward compatibility wrapper for sendSMS using Vynfy Gateway
 */
export async function sendSMS(to: string, message: string): Promise<boolean> {
  return vynfySendSMS(to, message);
}


import { createAdminClient } from './supabase/admin';
import { sendSMS } from './vynfy';
import { addLocalActivityLog } from './dataStore';

export async function sendAlertSMS(
  action: string,
  itemType: string,
  itemName: string,
  user: string = 'Admin'
) {
  try {
    let logData = null;
    const isPlaceholderSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

    if (!isPlaceholderSupabase) {
      try {
        const supabase = createAdminClient();
        const { data } = await supabase
          .from('activity_logs')
          .insert([
            {
              action,
              item_type: itemType,
              item_name: itemName,
              user,
            },
          ])
          .select()
          .single();
        if (data) logData = data;
      } catch (err) {
        console.warn('Supabase activity log insert failed, logging locally:', err);
      }
    }

    if (!logData) {
      logData = addLocalActivityLog({
        action,
        item_type: itemType,
        item_name: itemName,
        user,
      });
    }

    const time = new Date().toLocaleTimeString('en-US', {
      timeZone: 'Africa/Accra',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).toLowerCase();

    const message = `ALERT: ${itemName} ${action} by ${user} at ${time}. Check dashboard. - BENGID`;
    const ownerPhone = process.env.OWNER_PHONE;

    if (ownerPhone) {
      await sendSMS(ownerPhone, message);
    } else {
      console.warn('OWNER_PHONE environment variable is not set. Cannot send alert SMS.');
    }

    return logData;
  } catch (err) {
    console.error('Error in sendAlertSMS:', err);
    return null;
  }
}

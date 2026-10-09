// Supabase Edge Function: sendAlertSMS
// Deploy command: supabase functions deploy sendAlertSMS --no-verify-jwt
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AlertPayload {
  action: "sold" | "deleted" | "modified" | "price_changed" | "new_lead" | string;
  item_type: "material" | "car" | "lead" | string;
  item_name: string;
  user?: string;
  custom_message?: string;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: AlertPayload = await req.json();
    const { action, item_type, item_name, user = "Admin", custom_message } = payload;

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const hubtelClientId = Deno.env.get("HUBTEL_CLIENT_ID") ?? "";
    const hubtelClientSecret = Deno.env.get("HUBTEL_CLIENT_SECRET") ?? "";
    const hubtelSenderId = Deno.env.get("HUBTEL_SENDER_ID") ?? "BENGID";
    const ownerPhone = Deno.env.get("OWNER_PHONE") ?? "";

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Insert into activity_logs
    const { error: logError } = await supabase.from("activity_logs").insert([
      {
        action,
        item_type,
        item_name,
        user,
      },
    ]);

    if (logError) {
      console.error("Failed to insert into activity_logs:", logError);
    }

    // 2. Format Ghana time (e.g. 2:14pm)
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Africa/Accra",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const time = timeFormatter.format(new Date()).toLowerCase();

    // 3. Construct Alert SMS message
    // Example: "ALERT: Toyota Yaris 2018 marked as SOLD by Admin at 2:14pm. Check dashboard. - BENGID"
    let actionDesc = action;
    if (action === "sold") actionDesc = "marked as SOLD";
    else if (action === "price_changed") actionDesc = "price modified";
    else if (action === "deleted") actionDesc = "deleted";
    else if (action === "modified") actionDesc = "modified";
    else if (action === "new_lead") actionDesc = "received as new lead";

    const message = custom_message || `ALERT: ${item_name} ${actionDesc} by ${user} at ${time}. Check dashboard. - BENGID`;

    // 4. Send SMS via Hubtel SMS API
    let smsSuccess = false;
    let hubtelResponse = null;

    if (hubtelClientId && hubtelClientSecret && ownerPhone) {
      const authHeader = `Basic ${btoa(`${hubtelClientId}:${hubtelClientSecret}`)}`;
      const smsRes = await fetch("https://smsc.hubtel.com/v1/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          From: hubtelSenderId,
          To: ownerPhone,
          Content: message,
        }),
      });

      smsSuccess = smsRes.ok;
      hubtelResponse = await smsRes.json().catch(() => null);
    } else {
      console.warn("Hubtel credentials or OWNER_PHONE not configured. SMS skipped.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        logged: !logError,
        sms_sent: smsSuccess,
        message,
        hubtel: hubtelResponse,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in sendAlertSMS edge function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

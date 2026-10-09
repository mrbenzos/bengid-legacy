/**
 * Rate Limiter for BenGid Platform
 * Implements sliding window in-memory rate limiting with automatic garbage collection.
 */

export interface RateLimitConfig {
  name: string;
  max: number;
  windowMs: number;
  description: string;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSec: number;
  matchedRule?: string;
}

// In-memory store: Map<"ruleName:clientIp", timestamp[]>
const requestStore = new Map<string, number[]>();

// Cleanup stale records every 5 minutes to manage memory consumption
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const entries = Array.from(requestStore.entries());
    for (let i = 0; i < entries.length; i++) {
      const [key, timestamps] = entries[i];
      const validTimestamps = timestamps.filter((t: number) => now - t < 1800000);
      if (validTimestamps.length === 0) {
        requestStore.delete(key);
      } else {
        requestStore.set(key, validTimestamps);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks rate limit for a specific key and rule configuration.
 */
export function checkRateLimit(
  identifier: string,
  ruleName: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const storeKey = `${ruleName}:${identifier}`;
  const windowStart = now - windowMs;

  const currentTimestamps = requestStore.get(storeKey) || [];
  const validTimestamps = currentTimestamps.filter((t: number) => t >= windowStart);

  if (validTimestamps.length >= max) {
    const oldestInWindow = validTimestamps[0];
    const resetMs = oldestInWindow + windowMs - now;
    const retryAfterSec = Math.ceil(resetMs / 1000);

    return {
      success: false,
      limit: max,
      remaining: 0,
      resetMs,
      retryAfterSec,
      matchedRule: ruleName,
    };
  }

  validTimestamps.push(now);
  requestStore.set(storeKey, validTimestamps);

  const remaining = Math.max(0, max - validTimestamps.length);
  const resetMs = windowMs;

  return {
    success: true,
    limit: max,
    remaining,
    resetMs,
    retryAfterSec: 0,
    matchedRule: ruleName,
  };
}

/**
 * Predefined Rate Limit Policies
 */
export const RATE_LIMIT_RULES = {
  // Global: All routes | 200 req / 15 min
  GLOBAL: {
    name: 'Global',
    max: 200,
    windowMs: 15 * 60 * 1000, // 15 mins
    description: 'Prevent DDoS / scraping',
  },
  // API: All /api/* | 100 req / 15 min
  API: {
    name: 'API',
    max: 100,
    windowMs: 15 * 60 * 1000, // 15 mins
    description: 'Protect backend endpoints',
  },
  // Auth: Signup, Signin | 10 req / 15 min
  AUTH: {
    name: 'Auth',
    max: 10,
    windowMs: 15 * 60 * 1000, // 15 mins
    description: 'Prevent brute-force attacks',
  },
  // OTP/SMS: Send-OTP, Verify-OTP | 5 req / 10 min
  OTP: {
    name: 'OTP/SMS',
    max: 5,
    windowMs: 10 * 60 * 1000, // 10 mins
    description: 'Protect SMS costs (Vynfy)',
  },
  // Password Reset: Forgot/Reset Password | 5 req / 30 min
  PASSWORD_RESET: {
    name: 'Password Reset',
    max: 5,
    windowMs: 30 * 60 * 1000, // 30 mins
    description: 'Prevent abuse',
  },
  // Order: Pre-order, Payment Init | 20 req / 15 min
  ORDER: {
    name: 'Order',
    max: 20,
    windowMs: 15 * 60 * 1000, // 15 mins
    description: 'Prevent order spam',
  },
};

/**
 * Determines applicable rules for a given pathname and checks all matching rate limits.
 */
export function evaluateRequestRateLimits(
  ip: string,
  pathname: string
): RateLimitResult {
  const path = pathname.toLowerCase();

  // Rules to evaluate in priority order (most specific to least specific)
  const rulesToCheck: RateLimitConfig[] = [];

  // Check 1: OTP / SMS API routes (only real API calls, not page views)
  if (path.startsWith('/api/') && (path.includes('/send-otp') || path.includes('/verify-otp'))) {
    rulesToCheck.push(RATE_LIMIT_RULES.OTP);
  }

  // Check 2: Password Reset API routes
  if (
    path.startsWith('/api/') &&
    (path.includes('/forgot-password') ||
      path.includes('/reset-password') ||
      path.includes('/password-reset'))
  ) {
    rulesToCheck.push(RATE_LIMIT_RULES.PASSWORD_RESET);
  }

  // Check 3: Auth API routes (Signup, Signin, Login)
  if (
    path.startsWith('/api/') &&
    (path.includes('/signup') || path.includes('/signin') || path.includes('/login'))
  ) {
    rulesToCheck.push(RATE_LIMIT_RULES.AUTH);
  }

  // Check 4: Order / Pre-order / Payment routes
  if (
    path.includes('/order') ||
    path.includes('/pre-order') ||
    path.includes('/payment') ||
    path.includes('/checkout') ||
    path.includes('/pay')
  ) {
    rulesToCheck.push(RATE_LIMIT_RULES.ORDER);
  }

  // Check 5: General API routes (/api/*)
  if (path.startsWith('/api/')) {
    rulesToCheck.push(RATE_LIMIT_RULES.API);
  }

  // Check 6: Global limit applies to all requests
  rulesToCheck.push(RATE_LIMIT_RULES.GLOBAL);

  // Evaluate from most specific to least specific
  for (let i = 0; i < rulesToCheck.length; i++) {
    const rule = rulesToCheck[i];
    const result = checkRateLimit(ip, rule.name, rule.max, rule.windowMs);
    if (!result.success) {
      return result;
    }
  }

  // If all checks pass, return the result of the most specific rule (or global)
  const primaryRule = rulesToCheck[0] || RATE_LIMIT_RULES.GLOBAL;
  return checkRateLimit(ip, primaryRule.name, primaryRule.max, primaryRule.windowMs);
}

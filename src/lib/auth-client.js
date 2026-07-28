import { createAuthClient } from "better-auth/react";

// Leave baseURL unset so the browser always uses the current site origin.
// This works for localhost, Vercel preview URLs, and the production domain.
export const authClient = createAuthClient();

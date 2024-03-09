/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [];

/**
 * An array of routes that are accessible to the authentication
 * These routes will redirect to dedicated page for authenticated users
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
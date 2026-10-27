const HOST = process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:4000";

export const API_HOST = HOST.replace(/\/$/, "");
export const API_BASE_URL = `${API_HOST}/api`;

export const TOKEN_KEY = "forja-token";

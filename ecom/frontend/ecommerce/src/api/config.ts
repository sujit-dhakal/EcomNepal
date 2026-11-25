export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

export const API_INTERNAL_URL = (
  process.env.API_INTERNAL_URL || API_BASE_URL
).replace(/\/+$/, "");

export const CHATBOT_API_URL = (
  process.env.NEXT_PUBLIC_CHATBOT_API_URL || "http://127.0.0.1:8080"
).replace(/\/+$/, "");

export const apiUrl = (path: string) =>
  new URL(path, `${API_BASE_URL}/`).toString();

export const internalApiUrl = (path: string) =>
  new URL(path, `${API_INTERNAL_URL}/`).toString();

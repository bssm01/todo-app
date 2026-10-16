const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function request(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.message || "Something went wrong. Please try again.");
  }
  return result;
}

export function isAuthError(error) {
  return /token|unauthorized/i.test(error.message);
}

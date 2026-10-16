const TOKEN_KEY = "daymark_token";
const USER_KEY = "daymark_user";

export function readToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function readUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveSession(nextToken, nextUser) {
  const safeUser = { username: nextUser?.username || "" };
  localStorage.setItem(TOKEN_KEY, nextToken);
  localStorage.setItem(USER_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

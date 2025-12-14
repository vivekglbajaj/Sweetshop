// src/auth.js
const TOKEN_KEY = "token";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
}


export function getRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // TEMP LOGIC
    if (payload.sub === "admin") return "ROLE_ADMIN";
    return "ROLE_USER";
  } catch {
    return null;
  }
}


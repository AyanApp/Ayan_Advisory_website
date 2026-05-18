const API_BASE_URL = "http://159.198.64.51:1337";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const apiClient = async (endpoint: string) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: "default",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
};

export const postClient = async (endpoint: string, body: Record<string, any>) => {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
};

export const getMediaUrl = (url?: string) => {
  if (!url) return "";
  return `${API_BASE_URL}${url}`;
};

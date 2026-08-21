const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:3001";

export const API_URL = `${API_BASE_URL}/api/v1`;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    }
  );

  if (!response.ok) {
    let message = "Si è verificato un errore.";

    try {
      const data = await response.json();

      message =
        data?.message ??
        data?.error ??
        message;
    } catch {
      // Response without JSON body.
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
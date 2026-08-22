const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:3001";

export const API_URL = `${API_BASE_URL}/api/v1`;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(
      `${API_URL}${endpoint}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      }
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ApiError(
      "Il servizio hotel non è raggiungibile in questo momento. Controlla la connessione e riprova."
    );
  }

  if (!response.ok) {
    let providerMessage = "";

    try {
      const data = (await response.json()) as {
        message?: string | string[];
        error?: string;
      };

      providerMessage = Array.isArray(data?.message)
        ? data.message.join(" ")
        : data?.message ?? data?.error ?? "";
    } catch {
      // Response without JSON body.
    }

    throw new ApiError(
      getPublicErrorMessage(response.status, providerMessage),
      response.status
    );
  }

  try {
    return (await response.json()) as T;
  } catch {
    throw new ApiError(
      "Il servizio ha restituito una risposta non valida. Riprova tra qualche istante.",
      response.status
    );
  }
}

function getPublicErrorMessage(
  status: number,
  providerMessage: string
): string {
  if (status === 410) {
    return (
      providerMessage ||
      "La ricerca è scaduta. Effettua una nuova ricerca per aggiornare disponibilità e tariffe."
    );
  }

  if (status === 404) {
    return (
      providerMessage ||
      "La ricerca, l’hotel o la tariffa non sono più disponibili."
    );
  }

  if (status === 408 || status === 504) {
    return "La richiesta sta impiegando troppo tempo. Riprova tra qualche istante.";
  }

  if (status === 429) {
    return "Sono state effettuate troppe richieste. Attendi qualche istante e riprova.";
  }

  if (status >= 500) {
    return "Il servizio hotel è temporaneamente non disponibile. Riprova tra qualche istante.";
  }

  if (status === 400) {
    return providerMessage || "Controlla i dati inseriti e riprova.";
  }

  if (status === 401 || status === 403) {
    return "Non è possibile completare questa operazione.";
  }

  return providerMessage || "Si è verificato un errore. Riprova.";
}

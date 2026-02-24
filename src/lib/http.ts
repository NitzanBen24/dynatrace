type ApiError = {
  message: string;
  status: number;
  info?: unknown;
};

function buildError(message: string, status: number, info?: unknown): ApiError {
  return { message, status, info };
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers
    }
  });

  const payload = await parseResponse(response);

  if (!response.ok) {
    const message = typeof payload === "object" && payload && "error" in payload
      ? String((payload as { error?: string }).error ?? response.statusText)
      : response.statusText;

    throw buildError(message, response.status, payload);
  }

  if (typeof payload === "object" && payload && "data" in payload) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

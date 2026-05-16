export class UpstreamError extends Error {
  constructor(
    public readonly provider: string,
    public readonly status: number,
    public readonly body: string,
  ) {
    super(`${provider} upstream error ${status}`);
    this.name = "UpstreamError";
  }
}

type FetchJsonOptions = {
  provider: string;
  timeoutMs?: number;
  revalidate?: number;
  headers?: HeadersInit;
};

export async function fetchJson<T>(
  url: string,
  { provider, timeoutMs = 10_000, revalidate, headers }: FetchJsonOptions,
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      next: revalidate !== undefined ? { revalidate } : undefined,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new UpstreamError(provider, res.status, body);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

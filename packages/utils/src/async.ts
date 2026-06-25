/** Resolves after `ms` milliseconds — used to simulate network latency in mocks. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

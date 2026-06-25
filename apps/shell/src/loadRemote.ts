// Webpack Module Federation runtime globals, injected into any build that uses
// ModuleFederationPlugin with a shared scope.
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: Record<string, unknown>;

interface FederationContainer {
  init: (shareScope: unknown) => Promise<void>;
  get: (module: string) => Promise<() => unknown>;
}

const scriptCache: Record<string, Promise<void>> = {};
const initializedContainers = new Set<string>();
let sharingInitialized: Promise<void> | undefined;

function loadScript(url: string): Promise<void> {
  if (!scriptCache[url]) {
    scriptCache[url] = new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = url;
      el.type = "text/javascript";
      el.async = true;
      el.onload = () => resolve();
      el.onerror = () => {
        delete scriptCache[url];
        reject(new Error(`Failed to load remote entry: ${url}`));
      };
      document.head.appendChild(el);
    });
  }
  return scriptCache[url];
}

/**
 * Dynamically loads an exposed module from a federated remote at runtime.
 * The remote URL is resolved from runtime config (not baked in at build time),
 * which is what allows the same shell artifact to run against any environment.
 */
export async function loadRemoteModule<T = unknown>(
  scope: string,
  url: string,
  module: string
): Promise<T> {
  await loadScript(url);

  sharingInitialized ??= __webpack_init_sharing__("default");
  await sharingInitialized;

  const container = (window as unknown as Record<string, FederationContainer>)[
    scope
  ];
  if (!container) {
    throw new Error(`Remote container "${scope}" was not found after loading ${url}`);
  }

  if (!initializedContainers.has(scope)) {
    await container.init(__webpack_share_scopes__.default);
    initializedContainers.add(scope);
  }

  const factory = await container.get(module);
  return factory() as T;
}

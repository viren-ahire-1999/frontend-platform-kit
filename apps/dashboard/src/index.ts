// Async boundary: defers app startup until Module Federation has negotiated
// shared singletons (react, react-dom, @fpk/ui).
import("./bootstrap");

export {};

// Async boundary: defers app startup until Module Federation has negotiated
// shared singletons (react, react-dom, react-router-dom, @fpk/ui).
import("./bootstrap");

export {};

import { env } from "$env/dynamic/public";

// Minimal stub of frame's env.public — only what the imported components use.
export const IMAGE_URL = env.PUBLIC_IMAGE_URL ?? "http://localhost:8070";

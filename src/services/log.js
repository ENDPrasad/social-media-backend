import pino from "pino";

export const Log = pino({
  name: "social-media-backend",
  level: "info",
});

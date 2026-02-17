import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { auth } from "../auth";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "../env";

const app = new Hono();

app.use(logger());
app.use(
  cors({
    origin: "http://localhost:3001",
    allowHeaders: [
      "Content-Type",
      "X-User-Agent",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

const getToken = async (headers: Headers) => {
  try {
    const { token } = await auth.api.getToken({ headers });
    return token;
  } catch (error) {
    return null;
  }
};

app.all("*", async (c) => {
  const headers = new Headers(c.req.raw.headers);

  const token = await getToken(headers);

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    method: c.req.method,
    headers,
  };

  if (c.req.method !== "GET" && c.req.method !== "HEAD") {
    fetchOptions.body = await c.req.text();
  }

  const res = await fetch(`http://localhost:8080${c.req.path}`, fetchOptions);

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
});

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);

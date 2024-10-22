import cors from '@elysiajs/cors';
import { Elysia } from "elysia";
import { DefaultContext, rateLimit } from 'elysia-rate-limit';

const app = new Elysia({
  prefix: "/api/v1",
})
  .trace(async ({ onHandle }) => {
    onHandle(({ begin, onStop }) => {
      onStop(({ end }) => {
        console.log('🪝 handle took', end - begin, 'ms')
      })
    })
  })
  .use(cors())
  .use(rateLimit({
    // define max cache size to 1,000
    context: new DefaultContext(1_000),
  }))
  .get("/", () => "Hello developer! 🥳")
  .post("/packages", ({ body }) => {
    return { message: "Packages endpoint", data: body };
  })
  .listen(6301);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
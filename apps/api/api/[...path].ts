import type {
  Request,
  Response,
} from 'express';

import { createApp } from '../src/create-app';

let server:
  | ((
      request: Request,
      response: Response,
    ) => unknown)
  | undefined;

async function getServer(): Promise<
  (
    request: Request,
    response: Response,
  ) => unknown
> {
  if (!server) {
    const app = await createApp();

    await app.init();

    server = app
      .getHttpAdapter()
      .getInstance();
  }

  return server!;
}

export default async function handler(
  request: Request,
  response: Response,
) {
  const appServer = await getServer();

  return appServer(
    request,
    response,
  );
}

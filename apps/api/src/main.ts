import { createApp } from './create-app';

async function bootstrap() {
  const app = await createApp();

  /*
   * Start
   */
  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  console.log('');
  console.log('======================================');
  console.log('🚀 SicilyTrip API started');
  console.log('======================================');
  console.log(`API     : http://localhost:${port}/api/v1`);
  console.log(`Swagger : http://localhost:${port}/docs`);
  console.log('======================================');
  console.log('');
}

void bootstrap();

import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { AdminService } from './admin.service';
import sharp from 'sharp';

describe('Journal image upload', () => {
  const create = jest
    .fn<
      Promise<{ id: string }>,
      [{ data: { mimeType: string; data: Uint8Array } }]
    >()
    .mockResolvedValue({ id: 'cover123' });
  const config = new ConfigService({
    ADMIN_EMAIL: 'test@example.test',
    ADMIN_PASSWORD: 'test-password',
    ADMIN_AUTH_SECRET: 'test-secret',
  });
  const service = new AdminService(config, {
    journalImage: { create },
  } as unknown as PrismaService);
  let auth: string;
  beforeAll(async () => {
    auth = `Bearer ${(await service.login('test@example.test', 'test-password')).token}`;
  });
  beforeEach(() => create.mockClear());
  it('rejects unauthenticated upload before storage', async () => {
    await expect(
      service.uploadJournalImage(undefined, Buffer.from('test')),
    ).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });
  it('rejects oversized and disguised files', async () => {
    for (const data of [
      Buffer.alloc(2097153),
      Buffer.from('<svg/>'),
      Buffer.from([255, 216, 255, 0]),
    ]) {
      await expect(service.uploadJournalImage(auth, data)).rejects.toThrow();
    }
    expect(create).not.toHaveBeenCalled();
  });
  it('persists a decoded cover and returns its permanent path', async () => {
    const data = await sharp({
      create: { width: 2, height: 2, channels: 3, background: '#ff8800' },
    })
      .png()
      .toBuffer();
    expect(await service.uploadJournalImage(auth, data)).toEqual({
      path: '/content/journal-images/cover123',
    });
    const stored = create.mock.calls[0][0].data;
    expect(stored.mimeType).toBe('image/webp');
    expect((await sharp(Buffer.from(stored.data)).metadata()).width).toBe(2);
  });
});

import { HttpException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  type StoredContact = {
    name: string;
    email: string;
    subject: string;
    message: string;
    consentAt: Date;
    expiresAt: Date;
  };
  const create = jest.fn<Promise<{ id: string }>, [{ data: StoredContact }]>();
  let service: ContactsService;

  beforeEach(() => {
    create.mockReset().mockResolvedValue({ id: 'contact-1' });
    service = new ContactsService({
      contactRequest: { create },
    } as unknown as PrismaService);
  });

  it('stores a consented request with a one-year retention date', async () => {
    await expect(
      service.create(
        {
          name: ' Mario Rossi ',
          email: 'MARIO@EXAMPLE.COM',
          subject: ' Informazioni ',
          message: ' Vorrei ricevere maggiori informazioni. ',
          privacyAccepted: true,
        },
        'client-1',
      ),
    ).resolves.toEqual({ ok: true });

    const stored = create.mock.calls[0][0].data;
    expect(stored.name).toBe('Mario Rossi');
    expect(stored.email).toBe('mario@example.com');
    expect(stored.subject).toBe('Informazioni');
    expect(stored.message).toBe('Vorrei ricevere maggiori informazioni.');
    expect(stored.consentAt).toBeInstanceOf(Date);
    expect(stored.expiresAt).toBeInstanceOf(Date);
  });

  it('silently ignores honeypot submissions', async () => {
    await expect(
      service.create(
        {
          name: 'Bot Test',
          email: 'bot@example.com',
          subject: 'Spam test',
          message: 'Messaggio automatico indesiderato.',
          privacyAccepted: true,
          website: 'https://spam.example',
        },
        'client-2',
      ),
    ).resolves.toEqual({ ok: true });
    expect(create).not.toHaveBeenCalled();
  });

  it('limits a client to five requests per hour', async () => {
    const dto = {
      name: 'Mario Rossi',
      email: 'mario@example.com',
      subject: 'Informazioni',
      message: 'Vorrei ricevere maggiori informazioni.',
      privacyAccepted: true,
    };
    for (let index = 0; index < 5; index += 1) {
      await service.create(dto, 'client-3');
    }
    await expect(service.create(dto, 'client-3')).rejects.toBeInstanceOf(
      HttpException,
    );
  });
});

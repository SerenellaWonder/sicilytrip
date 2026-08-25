import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class CustomerEmailService {
  private readonly apiKey?: string;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.get<string>('RESEND_API_KEY');
    this.from =
      config.get<string>('RESEND_FROM_EMAIL') ??
      'SicilyTrip <onboarding@resend.dev>';
  }

  isConfigured() {
    return Boolean(this.apiKey);
  }

  async sendAccessCode(email: string, code: string) {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Il servizio email non è ancora configurato.',
      );
    }

    const resend = new Resend(this.apiKey);
    const { error } = await resend.emails.send({
      from: this.from,
      to: email,
      subject: 'Codice di accesso alla tua area SicilyTrip',
      html: `
        <div style="font-family:Arial,sans-serif;color:#0D2340;line-height:1.6">
          <h1 style="font-size:24px">Il tuo codice SicilyTrip</h1>
          <p>Utilizza questo codice per accedere alle tue prenotazioni:</p>
          <p style="font-size:32px;font-weight:700;letter-spacing:8px;color:#F58220">${code}</p>
          <p>Il codice scade tra 10 minuti e può essere utilizzato una sola volta.</p>
          <p>Se non hai richiesto tu questo accesso, ignora questa email.</p>
        </div>
      `,
    });

    if (error) {
      throw new ServiceUnavailableException(
        'Non è stato possibile inviare il codice di accesso.',
      );
    }
  }
}

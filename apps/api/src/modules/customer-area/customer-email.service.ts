import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class CustomerEmailService {
  private static readonly BOOKING_NOTIFICATION_EMAIL =
    'serenella.angelilli@gmail.com';

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

  async sendBookingConfirmation(input: {
    referenceCode: string;
    hotelName: string;
    checkIn: Date;
    checkOut: Date;
  }) {
    if (!this.apiKey) {
      throw new ServiceUnavailableException(
        'Il servizio email non è ancora configurato.',
      );
    }

    const resend = new Resend(this.apiKey);
    const referenceCode = this.escapeHtml(input.referenceCode);
    const hotelName = this.escapeHtml(input.hotelName || 'Hotel');
    const { error } = await resend.emails.send({
      from: this.from,
      to: CustomerEmailService.BOOKING_NOTIFICATION_EMAIL,
      subject: `Nuova prenotazione SicilyTrip - ${input.referenceCode}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#0D2340;line-height:1.6;max-width:620px;margin:0 auto">
          <p style="font-size:14px;font-weight:700;letter-spacing:2px;color:#F58220">SICILYTRIP</p>
          <h1 style="font-size:26px;margin-bottom:8px">Prenotazione confermata</h1>
          <p>È stata confermata una prenotazione presso <strong>${hotelName}</strong>.</p>
          <div style="background:#F5F7FA;border-radius:12px;padding:20px;margin:24px 0">
            <p style="margin:0 0 8px">Codice di riferimento</p>
            <p style="font-size:24px;font-weight:700;color:#F58220;margin:0 0 16px">${referenceCode}</p>
            <p style="margin:0"><strong>Check-in:</strong> ${this.formatDate(input.checkIn)}</p>
            <p style="margin:4px 0 0"><strong>Check-out:</strong> ${this.formatDate(input.checkOut)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw new ServiceUnavailableException(
        'Non è stato possibile inviare la conferma della prenotazione.',
      );
    }
  }

  private formatDate(value: Date) {
    return new Intl.DateTimeFormat('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(value);
  }

  private escapeHtml(value: string) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}

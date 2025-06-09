
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Download, Mail, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface QRCodeDisplayProps {
  reservationData: {
    id: string;
    device: {
      name: string;
      category: string;
      image: string;
    };
    startDate: Date;
    endDate: Date;
    firstName: string;
    lastName: string;
    email: string;
    pickupLocation: string;
    qrCode: string;
  };
  onClose: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ reservationData, onClose }) => {
  const handleDownloadQR = () => {
    // Create a download link for the QR code
    const link = document.createElement('a');
    link.href = reservationData.qrCode;
    link.download = `qr-code-${reservationData.id}.png`;
    link.click();
  };

  const handleEmailQR = () => {
    // Compose email with reservation details
    const subject = `Reservering bevestigd: ${reservationData.device.name}`;
    const body = `
Beste ${reservationData.firstName},

Uw reservering is bevestigd!

Apparaat: ${reservationData.device.name}
Periode: ${format(reservationData.startDate, 'dd MMMM yyyy', { locale: nl })} tot ${format(reservationData.endDate, 'dd MMMM yyyy', { locale: nl })}
Ophaallocatie: ${reservationData.pickupLocation}

Gebruik de QR-code in bijlage om uw apparaat op te halen.

Met vriendelijke groet,
SchoolLend Uitleendienst
    `;

    const mailtoLink = `mailto:${reservationData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success Message */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-green-800">
            <CheckCircle className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Reservering Bevestigd!</h3>
              <p className="text-sm">Uw reservering is succesvol verwerkt.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Card */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="w-6 h-6" />
            Uw QR-Code
          </CardTitle>
          <CardDescription>
            Bewaar deze QR-code om uw apparaat op te halen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-muted-foreground/30">
              {/* Placeholder QR Code - in real implementation, this would be generated */}
              <div className="w-48 h-48 bg-gray-900 flex items-center justify-center text-white text-xs">
                QR CODE
                <br />
                {reservationData.id}
              </div>
            </div>
          </div>

          {/* Reservation Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <div className="text-3xl">{reservationData.device.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{reservationData.device.name}</h3>
                <p className="text-muted-foreground mb-2">{reservationData.device.category}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(reservationData.startDate, 'dd MMMM yyyy', { locale: nl })} - 
                      {format(reservationData.endDate, 'dd MMMM yyyy', { locale: nl })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{reservationData.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Ophalen tussen 08:00 - 17:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Ophaalinstructies</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ga naar de uitleenbalie op {reservationData.pickupLocation}</li>
                <li>• Laat uw QR-code scannen door de medewerker</li>
                <li>• Toon een geldig identiteitsbewijs</li>
                <li>• Controleer het apparaat bij ontvangst</li>
                <li>• Bewaar deze QR-code ook voor het terugbrengen</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleDownloadQR} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              QR-Code Downloaden
            </Button>
            <Button variant="outline" onClick={handleEmailQR} className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              E-mail naar mezelf
            </Button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Een bevestiging is ook verstuurd naar: <strong>{reservationData.email}</strong>
            </p>
            <Button onClick={onClose} className="w-full sm:w-auto">
              Terug naar Hoofdmenu
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Belangrijke Informatie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">1</Badge>
              <p className="text-sm">
                <strong>Identificatie:</strong> Neem een geldig identiteitsbewijs mee bij het ophalen.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">2</Badge>
              <p className="text-sm">
                <strong>Terugbrengen:</strong> Gebruik dezelfde QR-code om het apparaat terug te brengen.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">3</Badge>
              <p className="text-sm">
                <strong>Te laat:</strong> Bij te late terugbracht kunnen er kosten in rekening worden gebracht.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">4</Badge>
              <p className="text-sm">
                <strong>Schade:</strong> Meld eventuele schade direct bij de uitleendienst.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Badge variant="outline" className="mt-0.5">5</Badge>
              <p className="text-sm">
                <strong>Vragen:</strong> Neem contact op via uitleen@school.nl of 020-1234567.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRCodeDisplay;

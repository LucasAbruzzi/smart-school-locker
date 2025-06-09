
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QrCode, Camera, Keyboard, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const QRScanner = () => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('camera');
  const [manualCode, setManualCode] = useState('');
  const [scannedData, setScannedData] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const mockScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      setScannedData({
        reservationId: 'RES-001',
        deviceName: 'MacBook Pro 14"',
        userName: 'Jan Janssen',
        startDate: '15 Jan 2024',
        endDate: '20 Jan 2024',
        status: 'confirmed'
      });
      setIsScanning(false);
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      setScannedData({
        reservationId: manualCode,
        deviceName: 'Canon EOS R6',
        userName: 'Maria de Wit',
        startDate: '22 Jan 2024',
        endDate: '25 Jan 2024',
        status: 'confirmed'
      });
    }
  };

  const handleApprove = () => {
    console.log('Reservation approved:', scannedData.reservationId);
    setScannedData(null);
    setManualCode('');
  };

  const handleReject = () => {
    console.log('Reservation rejected:', scannedData.reservationId);
    setScannedData(null);
    setManualCode('');
  };

  if (scannedData) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            QR-Code Gescand
          </CardTitle>
          <CardDescription>
            Reservering details gevonden
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-muted rounded-lg">
            <div className="grid gap-3">
              <div className="flex justify-between">
                <span className="font-medium">Reservering ID:</span>
                <Badge>{scannedData.reservationId}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Apparaat:</span>
                <span>{scannedData.deviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Gebruiker:</span>
                <span>{scannedData.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Periode:</span>
                <span>{scannedData.startDate} - {scannedData.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge className="bg-green-100 text-green-600">
                  {scannedData.status === 'confirmed' ? 'Bevestigd' : scannedData.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleApprove} className="flex-1">
              <CheckCircle className="w-4 h-4 mr-2" />
              Goedkeuren
            </Button>
            <Button variant="outline" onClick={handleReject} className="flex-1">
              <AlertCircle className="w-4 h-4 mr-2" />
              Afwijzen
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Mode Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-6 h-6" />
            QR-Code Scanner
          </CardTitle>
          <CardDescription>
            Scan QR-codes voor reserveringen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Button
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              onClick={() => setScanMode('camera')}
              className="flex-1"
            >
              <Camera className="w-4 h-4 mr-2" />
              Camera
            </Button>
            <Button
              variant={scanMode === 'manual' ? 'default' : 'outline'}
              onClick={() => setScanMode('manual')}
              className="flex-1"
            >
              <Keyboard className="w-4 h-4 mr-2" />
              Handmatig
            </Button>
          </div>

          {scanMode === 'camera' ? (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                {isScanning ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Scannen...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Klik op 'Start Scannen' om te beginnen</p>
                  </div>
                )}
              </div>
              <Button onClick={mockScan} disabled={isScanning} className="w-full">
                {isScanning ? 'Bezig met scannen...' : 'Start Scannen'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="manual-code">Reservering ID</Label>
                <Input
                  id="manual-code"
                  placeholder="Voer reservering ID in (bijv. RES-001)"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                />
              </div>
              <Button onClick={handleManualSubmit} className="w-full" disabled={!manualCode.trim()}>
                Zoeken
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Instructies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>• Houd de QR-code voor de camera</p>
            <p>• Zorg voor voldoende licht</p>
            <p>• De QR-code moet volledig zichtbaar zijn</p>
            <p>• Bij problemen, gebruik de handmatige invoer</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;

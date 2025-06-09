
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, QrCode, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

const MyReservations = () => {
  const [reservations] = useState([
    {
      id: 'RES-001',
      device: {
        name: 'MacBook Pro 14"',
        category: 'Laptops',
        image: '💻'
      },
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-01-20'),
      status: 'confirmed',
      pickupLocation: 'Hoofdgebouw',
      qrCode: 'QR123456'
    },
    {
      id: 'RES-002',
      device: {
        name: 'Canon EOS R6',
        category: 'Camera\'s',
        image: '📷'
      },
      startDate: new Date('2024-01-22'),
      endDate: new Date('2024-01-25'),
      status: 'active',
      pickupLocation: 'Media Lab',
      qrCode: 'QR789012'
    },
    {
      id: 'RES-003',
      device: {
        name: 'iPad Pro 12.9"',
        category: 'Tablets',
        image: '📱'
      },
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-01-12'),
      status: 'completed',
      pickupLocation: 'Hoofdgebouw',
      qrCode: 'QR345678'
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-600">Bevestigd</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-600">Actief</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-600">Voltooid</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-600">Geannuleerd</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleShowQR = (reservation: any) => {
    console.log('Show QR for reservation:', reservation.id);
  };

  const handleCancel = (reservationId: string) => {
    console.log('Cancel reservation:', reservationId);
  };

  const handleExtend = (reservationId: string) => {
    console.log('Extend reservation:', reservationId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              <span>Terug naar Home</span>
            </Link>
            <h1 className="text-2xl font-bold">Mijn Reserveringen</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{reservation.device.image}</div>
                    <div>
                      <CardTitle className="text-lg">{reservation.device.name}</CardTitle>
                      <CardDescription>{reservation.device.category}</CardDescription>
                      <div className="mt-2">
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleShowQR(reservation)}>
                        <QrCode className="w-4 h-4 mr-2" />
                        Toon QR-code
                      </DropdownMenuItem>
                      {reservation.status === 'confirmed' && (
                        <>
                          <DropdownMenuItem onClick={() => handleExtend(reservation.id)}>
                            <Clock className="w-4 h-4 mr-2" />
                            Verlengen
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleCancel(reservation.id)}
                            className="text-red-600"
                          >
                            Annuleren
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Periode</p>
                      <p className="text-muted-foreground">
                        {format(reservation.startDate, 'dd MMM', { locale: nl })} - {format(reservation.endDate, 'dd MMM yyyy', { locale: nl })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Ophaallocatie</p>
                      <p className="text-muted-foreground">{reservation.pickupLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Reservering ID</p>
                      <p className="text-muted-foreground">{reservation.id}</p>
                    </div>
                  </div>
                </div>
                
                {reservation.status === 'confirmed' && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Ophaalinstructies:</strong> Gebruik uw QR-code om het apparaat op te halen bij {reservation.pickupLocation}.
                    </p>
                  </div>
                )}
                
                {reservation.status === 'active' && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Actieve uitlening:</strong> Vergeet niet het apparaat terug te brengen op {format(reservation.endDate, 'dd MMMM yyyy', { locale: nl })}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {reservations.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-muted-foreground mb-4">U heeft nog geen reserveringen gemaakt.</p>
                <Link to="/catalog">
                  <Button>Apparaat Reserveren</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;

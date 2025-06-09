
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DeviceCard from '@/components/DeviceCard';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import ReservationForm from '@/components/ReservationForm';
import QRCodeDisplay from '@/components/QRCodeDisplay';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentStep, setCurrentStep] = useState<'catalog' | 'calendar' | 'form' | 'qr'>('catalog');
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [selectedDates, setSelectedDates] = useState<{ start: Date; end: Date } | null>(null);
  const [reservationData, setReservationData] = useState<any>(null);

  const devices = [
    {
      id: 1,
      name: 'MacBook Pro 14"',
      category: 'Laptops',
      description: 'Krachtige laptop voor video editing en programmeren met M1 Pro chip',
      image: '💻',
      available: 15,
      total: 20,
      location: 'Hoofdgebouw',
      nextAvailable: '12 Jan',
      specifications: ['M1 Pro', '16GB RAM', '512GB SSD', 'TouchBar']
    },
    {
      id: 2,
      name: 'Canon EOS R6',
      category: 'Camera\'s',
      description: 'Professionele camera voor foto en video projecten',
      image: '📷',
      available: 3,
      total: 5,
      location: 'Media Lab',
      specifications: ['45MP', '4K Video', '12fps burst', 'Image Stabilization']
    },
    {
      id: 3,
      name: 'iPad Pro 12.9"',
      category: 'Tablets',
      description: 'Ideaal voor presentaties en creatieve projecten',
      image: '📱',
      available: 8,
      total: 12,
      location: 'Hoofdgebouw',
      specifications: ['M2 chip', 'Apple Pencil', '128GB', 'WiFi + Cellular']
    },
    {
      id: 4,
      name: 'Bosch Boormachine',
      category: 'Gereedschap',
      description: 'Professionele boormachine voor technische projecten',
      image: '🔧',
      available: 2,
      total: 4,
      location: 'Techniek Lab',
      specifications: ['18V', 'Li-ion batterij', '13mm boorhouder', 'LED lamp']
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4',
      category: 'Audio',
      description: 'Noise-cancelling hoofdtelefoon voor opnames',
      image: '🎧',
      available: 6,
      total: 8,
      location: 'Audio Studio',
      specifications: ['Noise Cancelling', '30h batterij', 'Bluetooth 5.0', 'Touch controls']
    }
  ];

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         device.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || device.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReserve = (deviceId: number) => {
    const device = devices.find(d => d.id === deviceId);
    setSelectedDevice(device);
    setCurrentStep('calendar');
  };

  const handleViewDetails = (deviceId: number) => {
    console.log('View details for device:', deviceId);
  };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setSelectedDates({ start: startDate, end: endDate });
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    const reservation = {
      id: `RES-${Date.now()}`,
      device: selectedDevice,
      startDate: selectedDates!.start,
      endDate: selectedDates!.end,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      pickupLocation: selectedDevice.location,
      qrCode: 'data:image/png;base64,placeholder'
    };
    setReservationData(reservation);
    setCurrentStep('qr');
  };

  const resetFlow = () => {
    setCurrentStep('catalog');
    setSelectedDevice(null);
    setSelectedDates(null);
    setReservationData(null);
  };

  if (currentStep === 'qr' && reservationData) {
    return (
      <div className="min-h-screen bg-background p-4">
        <QRCodeDisplay reservationData={reservationData} onClose={resetFlow} />
      </div>
    );
  }

  if (currentStep === 'form' && selectedDevice && selectedDates) {
    return (
      <div className="min-h-screen bg-background p-4">
        <ReservationForm
          device={selectedDevice}
          startDate={selectedDates.start}
          endDate={selectedDates.end}
          onSubmit={handleFormSubmit}
          onCancel={() => setCurrentStep('calendar')}
        />
      </div>
    );
  }

  if (currentStep === 'calendar' && selectedDevice) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentStep('catalog')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar Catalogus
            </Button>
          </div>
          <AvailabilityCalendar
            deviceName={selectedDevice.name}
            onDateSelect={handleDateSelect}
            unavailableDates={[]}
            maxReservationDays={14}
          />
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold">Apparaten Catalogus</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Zoek apparaten..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Categorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle categorieën</SelectItem>
                <SelectItem value="Laptops">Laptops</SelectItem>
                <SelectItem value="Tablets">Tablets</SelectItem>
                <SelectItem value="Camera's">Camera's</SelectItem>
                <SelectItem value="Gereedschap">Gereedschap</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onReserve={handleReserve}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Geen apparaten gevonden voor uw zoekopdracht.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;

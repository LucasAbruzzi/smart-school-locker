
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Calendar, 
  Package, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
  Edit,
  Trash2,
  Download
} from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface Reservation {
  id: string;
  device: {
    name: string;
    category: string;
    serialNumber: string;
  };
  user: {
    name: string;
    email: string;
    type: 'student' | 'staff';
    class?: string;
    department?: string;
  };
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'ready' | 'active' | 'returned' | 'overdue';
  lockerNumber?: string;
  createdAt: Date;
}

const AdminDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('today');

  // Mock data
  const reservations: Reservation[] = [
    {
      id: 'RES-001',
      device: {
        name: 'MacBook Pro 14"',
        category: 'Laptops',
        serialNumber: 'MBP-2023-001'
      },
      user: {
        name: 'Jan de Vries',
        email: 'jan.devries@student.school.nl',
        type: 'student',
        class: '4A'
      },
      startDate: new Date(),
      endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'RES-002',
      device: {
        name: 'Canon EOS R6',
        category: 'Camera\'s',
        serialNumber: 'CAM-2023-005'
      },
      user: {
        name: 'Maria Bakker',
        email: 'maria.bakker@school.nl',
        type: 'staff',
        department: 'Media & Design'
      },
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'ready',
      lockerNumber: 'L-15',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: 'RES-003',
      device: {
        name: 'iPad Pro 12.9"',
        category: 'Tablets',
        serialNumber: 'TAB-2023-008'
      },
      user: {
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@student.school.nl',
        type: 'student',
        class: 'HBO-ICT jaar 2'
      },
      startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      status: 'active',
      lockerNumber: 'L-03',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ];

  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { label: 'Wachtend', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      ready: { label: 'Klaar', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
      active: { label: 'Uitgeleend', color: 'bg-green-100 text-green-800', icon: Package },
      returned: { label: 'Teruggebracht', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
      overdue: { label: 'Te laat', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  const getStatistics = () => {
    const total = reservations.length;
    const pending = reservations.filter(r => r.status === 'pending').length;
    const active = reservations.filter(r => r.status === 'active').length;
    const overdue = reservations.filter(r => r.status === 'overdue').length;
    
    return { total, pending, active, overdue };
  };

  const stats = getStatistics();

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = searchQuery === '' || 
      reservation.device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (reservationId: string, newStatus: string) => {
    console.log(`Updating reservation ${reservationId} to status ${newStatus}`);
    // Implementation would update the reservation status
  };

  const handleAssignLocker = (reservationId: string, lockerNumber: string) => {
    console.log(`Assigning locker ${lockerNumber} to reservation ${reservationId}`);
    // Implementation would assign locker and update status
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Beheerdersdashboard</h1>
            <p className="text-muted-foreground">Overzicht en beheer van alle reserveringen</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Package className="w-4 h-4 mr-2" />
              Nieuw Apparaat
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Totaal Reserveringen</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Wachtend</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actief</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <Package className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Te Laat</p>
                  <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Zoek op naam, apparaat of reserveringsnummer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle statussen</SelectItem>
                  <SelectItem value="pending">Wachtend</SelectItem>
                  <SelectItem value="ready">Klaar</SelectItem>
                  <SelectItem value="active">Uitgeleend</SelectItem>
                  <SelectItem value="returned">Teruggebracht</SelectItem>
                  <SelectItem value="overdue">Te laat</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-48">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Vandaag</SelectItem>
                  <SelectItem value="week">Deze week</SelectItem>
                  <SelectItem value="month">Deze maand</SelectItem>
                  <SelectItem value="all">Alle datums</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
        <Card>
          <CardHeader>
            <CardTitle>Reserveringen ({filteredReservations.length})</CardTitle>
            <CardDescription>
              Klik op een reservering voor meer details en acties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredReservations.map((reservation) => {
                const statusConfig = getStatusConfig(reservation.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{reservation.device.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {reservation.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {reservation.user.name} • {reservation.user.email}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>
                            {format(reservation.startDate, 'dd MMM', { locale: nl })} - 
                            {format(reservation.endDate, 'dd MMM yyyy', { locale: nl })}
                          </span>
                          {reservation.lockerNumber && (
                            <span>Locker: {reservation.lockerNumber}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge className={statusConfig.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusConfig.label}
                      </Badge>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              {filteredReservations.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Geen reserveringen gevonden</p>
                  <p className="text-sm">Pas uw filters aan om meer resultaten te zien</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

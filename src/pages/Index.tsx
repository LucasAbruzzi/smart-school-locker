import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Calendar, QrCode, Settings, BookOpen, Laptop, Camera, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/catalog');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const featuredItems = [
    {
      id: 1,
      name: 'MacBook Pro 14"',
      category: 'Laptops',
      available: 15,
      total: 20,
      image: '💻',
      description: 'Krachtige laptop voor video editing en programmeren'
    },
    {
      id: 2,
      name: 'Canon EOS R6',
      category: 'Camera\'s',
      available: 3,
      total: 5,
      image: '📷',
      description: 'Professionele camera voor foto en video projecten'
    },
    {
      id: 3,
      name: 'iPad Pro 12.9"',
      category: 'Tablets',
      available: 8,
      total: 12,
      image: '📱',
      description: 'Ideaal voor presentaties en creatieve projecten'
    },
    {
      id: 4,
      name: 'Bosch Boormachine',
      category: 'Gereedschap',
      available: 2,
      total: 4,
      image: '🔧',
      description: 'Professionele boormachine voor technische projecten'
    }
  ];

  const categories = [
    { name: 'Laptops', icon: Laptop, count: 45, color: 'bg-blue-100 text-blue-600' },
    { name: 'Tablets', icon: BookOpen, count: 32, color: 'bg-green-100 text-green-600' },
    { name: 'Camera\'s', icon: Camera, count: 18, color: 'bg-purple-100 text-purple-600' },
    { name: 'Gereedschap', icon: Wrench, count: 24, color: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">SchoolLend</h1>
                <p className="text-sm text-muted-foreground">Apparaten Uitleendienst</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/catalog" className="text-muted-foreground hover:text-foreground transition-colors">
                Catalogus
              </Link>
              <Link to="/my-reservations" className="text-muted-foreground hover:text-foreground transition-colors">
                Mijn Reserveringen
              </Link>
              <Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help
              </Link>
            </nav>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Inloggen
              </Button>
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Reserveer School Apparatuur
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Laptops, tablets, camera's en meer - eenvoudig reserveren met QR-code ophalen
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Zoek apparaten (bijv. MacBook, Canon camera, boormachine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 py-6 text-lg"
              />
              <Button onClick={handleSearch} className="absolute right-2 top-2" size="sm">
                Zoeken
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/catalog">
              <Button size="lg" className="bg-primary text-primary-foreground">
                <Calendar className="w-5 h-5 mr-2" />
                Bekijk Beschikbaarheid
              </Button>
            </Link>
            <Link to="/qr-scan">
              <Button variant="outline" size="lg">
                <QrCode className="w-5 h-5 mr-2" />
                QR-Code Scanner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Categorieën
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link key={category.name} to={`/catalog?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg ${category.color} mx-auto mb-3 flex items-center justify-center`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Populaire Apparaten
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="text-4xl mb-2">{item.image}</div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">
                      Beschikbaar: {item.available}/{item.total}
                    </span>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      item.available > 5 ? 'bg-green-100 text-green-600' :
                      item.available > 0 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {item.available > 5 ? 'Ruim beschikbaar' :
                       item.available > 0 ? 'Beperkt beschikbaar' :
                       'Niet beschikbaar'}
                    </div>
                  </div>
                  <Link to="/catalog">
                    <Button className="w-full" disabled={item.available === 0}>
                      {item.available > 0 ? 'Reserveer Nu' : 'Uitverkocht'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Snelle Acties
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/catalog">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Reservering Maken</h4>
                  <p className="text-sm text-muted-foreground">
                    Bekijk beschikbaarheid en reserveer direct
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/qr-scan">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <QrCode className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">QR-Code Scannen</h4>
                  <p className="text-sm text-muted-foreground">
                    Haal je gereserveerde apparaat op
                  </p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/my-reservations">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Mijn Reserveringen</h4>
                  <p className="text-sm text-muted-foreground">
                    Bekijk je actieve en geplande reserveringen
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm opacity-90">Uitleendienst School</p>
              <p className="text-sm opacity-90">Email: uitleen@school.nl</p>
              <p className="text-sm opacity-90">Tel: 020-1234567</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Openingstijden</h4>
              <p className="text-sm opacity-90">Ma-Vr: 08:00 - 17:00</p>
              <p className="text-sm opacity-90">Zaterdag: 09:00 - 12:00</p>
              <p className="text-sm opacity-90">Zondag: Gesloten</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <Link to="/help" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Veelgestelde vragen
              </Link>
              <a href="/terms" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Voorwaarden
              </a>
              <Link to="/help" className="block text-sm opacity-90 hover:opacity-100 transition-opacity">
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

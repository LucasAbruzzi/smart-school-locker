
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Info } from 'lucide-react';

interface DeviceCardProps {
  device: {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string;
    available: number;
    total: number;
    location: string;
    nextAvailable?: string;
    specifications?: string[];
  };
  onReserve: (deviceId: number) => void;
  onViewDetails: (deviceId: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onReserve, onViewDetails }) => {
  const availabilityStatus = () => {
    if (device.available === 0) return { text: 'Niet beschikbaar', color: 'bg-red-100 text-red-600' };
    if (device.available <= 2) return { text: 'Beperkt beschikbaar', color: 'bg-yellow-100 text-yellow-600' };
    return { text: 'Beschikbaar', color: 'bg-green-100 text-green-600' };
  };

  const status = availabilityStatus();

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{device.image}</div>
          <Badge className={status.color}>
            {status.text}
          </Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {device.name}
        </CardTitle>
        <CardDescription className="flex items-center gap-1">
          {device.category}
          <span className="mx-1">•</span>
          <MapPin className="w-3 h-3" />
          {device.location}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {device.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Beschikbaar: <span className="text-primary">{device.available}/{device.total}</span>
          </span>
          {device.nextAvailable && device.available === 0 && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Vrij: {device.nextAvailable}
            </span>
          )}
        </div>
        
        {device.specifications && (
          <div className="flex flex-wrap gap-1">
            {device.specifications.slice(0, 3).map((spec, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
            {device.specifications.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{device.specifications.length - 3} meer
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(device.id)}
          >
            <Info className="w-4 h-4 mr-1" />
            Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            disabled={device.available === 0}
            onClick={() => onReserve(device.id)}
          >
            {device.available > 0 ? 'Reserveer' : 'Uitverkocht'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceCard;

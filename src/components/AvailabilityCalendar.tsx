
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, AlertCircle } from 'lucide-react';
import { format, addDays, isSameDay } from 'date-fns';
import { nl } from 'date-fns/locale';

interface AvailabilityCalendarProps {
  deviceName: string;
  onDateSelect: (startDate: Date, endDate: Date) => void;
  unavailableDates?: Date[];
  maxReservationDays?: number;
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  deviceName,
  onDateSelect,
  unavailableDates = [],
  maxReservationDays = 14
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date>();
  const [selectedEndDate, setSelectedEndDate] = useState<Date>();
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const handleDateClick = (date: Date | undefined) => {
    if (!date) return;

    // Check if date is unavailable
    if (unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate))) {
      return;
    }

    if (!selectedStartDate || !isSelectingEnd) {
      // Select start date
      setSelectedStartDate(date);
      setSelectedEndDate(undefined);
      setIsSelectingEnd(true);
    } else {
      // Select end date
      if (date < selectedStartDate) {
        // If end date is before start date, swap them
        setSelectedStartDate(date);
        setSelectedEndDate(selectedStartDate);
      } else {
        setSelectedEndDate(date);
      }
      setIsSelectingEnd(false);
    }
  };

  const handleConfirmReservation = () => {
    if (selectedStartDate && selectedEndDate) {
      onDateSelect(selectedStartDate, selectedEndDate);
    }
  };

  const handleReset = () => {
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setIsSelectingEnd(false);
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate) return false;
    if (!selectedEndDate) return isSameDay(date, selectedStartDate);
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const getReservationDuration = () => {
    if (!selectedStartDate || !selectedEndDate) return 0;
    return Math.ceil((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Beschikbaarheid: {deviceName}
        </CardTitle>
        <CardDescription>
          Selecteer uw gewenste uitleenperiode. Klik eerst op de startdatum, dan op de einddatum.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Calendar
              mode="single"
              selected={selectedStartDate}
              onSelect={handleDateClick}
              disabled={(date) => 
                date < new Date() || 
                isDateUnavailable(date) ||
                (selectedStartDate && Math.abs(date.getTime() - selectedStartDate.getTime()) > maxReservationDays * 24 * 60 * 60 * 1000)
              }
              modifiers={{
                unavailable: unavailableDates,
                inRange: isDateInRange,
                startDate: selectedStartDate ? [selectedStartDate] : [],
                endDate: selectedEndDate ? [selectedEndDate] : []
              }}
              modifiersClassNames={{
                unavailable: 'bg-red-100 text-red-800 line-through',
                inRange: 'bg-primary/20 text-primary',
                startDate: 'bg-primary text-primary-foreground font-bold',
                endDate: 'bg-primary text-primary-foreground font-bold'
              }}
              locale={nl}
              className="rounded-md border"
            />
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Geselecteerde Periode</h4>
              {selectedStartDate ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Start</Badge>
                    <span>{format(selectedStartDate, 'dd MMMM yyyy', { locale: nl })}</span>
                  </div>
                  {selectedEndDate && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Eind</Badge>
                      <span>{format(selectedEndDate, 'dd MMMM yyyy', { locale: nl })}</span>
                    </div>
                  )}
                  {selectedStartDate && selectedEndDate && (
                    <div className="flex items-center gap-2 pt-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Duur: {getReservationDuration()} {getReservationDuration() === 1 ? 'dag' : 'dagen'}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Geen datum geselecteerd
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Legenda</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span>Geselecteerd</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-primary/20 rounded"></div>
                  <span>Geselecteerde periode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 rounded"></div>
                  <span>Niet beschikbaar</span>
                </div>
              </div>
            </div>
            
            {maxReservationDays && (
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Maximale uitleenduur</p>
                  <p>Dit apparaat kan maximaal {maxReservationDays} dagen worden uitgeleend.</p>
                </div>
              </div>
            )}
            
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={handleReset} className="flex-1">
                Reset
              </Button>
              <Button 
                onClick={handleConfirmReservation}
                disabled={!selectedStartDate || !selectedEndDate}
                className="flex-1"
              >
                Bevestig Periode
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, GraduationCap, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';

interface ReservationFormProps {
  device: {
    name: string;
    category: string;
    image: string;
  };
  startDate: Date;
  endDate: Date;
  onSubmit: (reservationData: any) => void;
  onCancel: () => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  device,
  startDate,
  endDate,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    class: '',
    department: '',
    purpose: '',
    comments: '',
    agreedToTerms: false,
    emergencyContact: ''
  });

  const [userType, setUserType] = useState<'student' | 'staff'>('student');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      alert('U moet akkoord gaan met de voorwaarden');
      return;
    }

    const reservationData = {
      ...formData,
      userType,
      device,
      startDate,
      endDate,
      submittedAt: new Date()
    };

    onSubmit(reservationData);
  };

  const getDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    if (userType === 'student') {
      requiredFields.push('studentId', 'class');
    } else {
      requiredFields.push('department');
    }
    
    return requiredFields.every(field => formData[field as keyof typeof formData]) && 
           formData.agreedToTerms;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Reservation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Reservering Bevestigen
          </CardTitle>
          <CardDescription>
            Controleer uw reservering en vul uw gegevens in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
            <div className="text-3xl">{device.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{device.name}</h3>
              <p className="text-muted-foreground">{device.category}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">
                  {format(startDate, 'dd MMM yyyy', { locale: nl })}
                </Badge>
                <span className="text-muted-foreground">tot</span>
                <Badge variant="outline">
                  {format(endDate, 'dd MMM yyyy', { locale: nl })}
                </Badge>
                <Badge>
                  {getDuration()} {getDuration() === 1 ? 'dag' : 'dagen'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reservation Form */}
      <Card>
        <CardHeader>
          <CardTitle>Persoonlijke Gegevens</CardTitle>
          <CardDescription>
            Vul uw gegevens in voor de reservering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-2">
              <Label>Ik ben een:</Label>
              <Select value={userType} onValueChange={(value: 'student' | 'staff') => setUserType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="staff">Medewerker</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Voornaam *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="Voornaam"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Achternaam *</Label>
                <Input
                  id="lastName"
                  placeholder="Achternaam"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mailadres *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="naam@school.nl"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefoonnummer</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06-12345678"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Student/Staff specific fields */}
            {userType === 'student' ? (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Studentnummer *</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="studentId"
                      placeholder="123456"
                      value={formData.studentId}
                      onChange={(e) => handleInputChange('studentId', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class">Klas *</Label>
                  <Input
                    id="class"
                    placeholder="bijv. 4A, HBO-ICT jaar 2"
                    value={formData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="department">Afdeling *</Label>
                <Input
                  id="department"
                  placeholder="bijv. ICT, Techniek, Administratie"
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  required
                />
              </div>
            )}

            {/* Purpose and Comments */}
            <div className="space-y-2">
              <Label htmlFor="purpose">Doel van gebruik</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea
                  id="purpose"
                  placeholder="Beschrijf waarvoor u het apparaat gaat gebruiken..."
                  value={formData.purpose}
                  onChange={(e) => handleInputChange('purpose', e.target.value)}
                  className="pl-10"
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Opmerkingen</Label>
              <Textarea
                id="comments"
                placeholder="Eventuele bijzonderheden of vragen..."
                value={formData.comments}
                onChange={(e) => handleInputChange('comments', e.target.value)}
                rows={2}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreedToTerms', !!checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ik ga akkoord met de voorwaarden
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Door het aanvinken van dit vakje bevestigt u dat u de{' '}
                    <a href="/terms" className="underline hover:text-primary">
                      algemene voorwaarden
                    </a>{' '}
                    en{' '}
                    <a href="/privacy" className="underline hover:text-primary">
                      privacyverklaring
                    </a>{' '}
                    heeft gelezen en accepteert.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Belangrijke informatie</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>U ontvangt een bevestiging via e-mail met QR-code</li>
                    <li>Gebruik de QR-code om het apparaat op te halen</li>
                    <li>Apparaten moeten op tijd worden teruggebracht</li>
                    <li>Schade moet direct worden gemeld</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
                Annuleren
              </Button>
              <Button type="submit" disabled={!isFormValid()} className="flex-1">
                Reservering Bevestigen
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationForm;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  const faqs = [
    {
      question: "Hoe kan ik een apparaat reserveren?",
      answer: "Ga naar de catalogus, selecteer het gewenste apparaat, kies uw periode in de kalender en vul het reserveringsformulier in. U ontvangt een QR-code per e-mail."
    },
    {
      question: "Hoe lang kan ik een apparaat lenen?",
      answer: "De standaard uitleenperiode is maximaal 14 dagen. Voor specifieke apparaten kunnen andere limieten gelden."
    },
    {
      question: "Wat als ik mijn QR-code kwijt ben?",
      answer: "U kunt uw QR-code opnieuw downloaden via 'Mijn Reserveringen' of contact opnemen met de uitleendienst."
    },
    {
      question: "Kan ik mijn reservering wijzigen?",
      answer: "Ja, u kunt uw reservering verlengen of annuleren via 'Mijn Reserveringen', mits het apparaat nog beschikbaar is."
    },
    {
      question: "Wat als een apparaat beschadigd is?",
      answer: "Meld schade onmiddellijk bij de uitleendienst. Controleer apparaten altijd bij ontvangst."
    },
    {
      question: "Zijn er kosten verbonden aan uitlenen?",
      answer: "Het uitlenen is gratis voor studenten en medewerkers. Bij te late terugbracht kunnen er wel kosten in rekening worden gebracht."
    }
  ];

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
            <h1 className="text-2xl font-bold">Help & Support</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Telefonisch</CardTitle>
              <CardDescription>Directe hulp tijdens openingstijden</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold mb-2">020-1234567</p>
              <p className="text-sm text-muted-foreground mb-4">Ma-Vr: 08:00 - 17:00</p>
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Bel Nu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>E-mail</CardTitle>
              <CardDescription>Voor uitgebreide vragen</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold mb-2">uitleen@school.nl</p>
              <p className="text-sm text-muted-foreground mb-4">Reactie binnen 24 uur</p>
              <Button variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                E-mail Sturen
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Snelle hulp tijdens kantooruren</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="font-semibold mb-2">Directe chat</p>
              <p className="text-sm text-muted-foreground mb-4">Ma-Vr: 09:00 - 16:00</p>
              <Button variant="outline" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6" />
              Veelgestelde Vragen
            </CardTitle>
            <CardDescription>
              Hier vindt u antwoorden op de meest gestelde vragen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Gebruikershandleiding (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Voorwaarden & Regelement (PDF)
              </Button>
              <Button variant="outline" className="w-full justify-start">
                QR-Code Scanner App
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Openingstijden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Maandag - Vrijdag:</span>
                  <span className="font-medium">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zaterdag:</span>
                  <span className="font-medium">09:00 - 12:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag:</span>
                  <span className="font-medium">Gesloten</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-muted-foreground">
                    Let op: tijdens vakanties kunnen andere tijden gelden
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;

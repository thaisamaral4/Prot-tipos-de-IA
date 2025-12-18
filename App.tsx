
import React, { useState, useEffect, useRef } from 'react';
import { 
  Button, 
  Card, 
  Input, 
  Select, 
  Badge, 
  Alert, 
  Skeleton 
} from './components/UI';
import { 
  ServiceType, 
  Service, 
  Unit, 
  BookingStep, 
  AppointmentStatus 
} from './types';
import { SERVICES, UNITS } from './mockData';

const App: React.FC = () => {
  const [step, setStep] = useState<BookingStep>('SERVICE_TYPE');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const bookingRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const resetBooking = () => {
    setStep('SERVICE_TYPE');
    setSelectedType(null);
    setSelectedService(null);
    setSelectedUnit(null);
    setSelectedDate('');
    setSelectedTime('');
    setPatientInfo({ name: '', phone: '', email: '' });
    setErrors({});
  };

  const handleNextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (step === 'SERVICE_TYPE') setStep('DETAILS');
      else if (step === 'DETAILS') setStep('UNIT');
      else if (step === 'UNIT') setStep('DATE_TIME');
      else if (step === 'DATE_TIME') setStep('PATIENT_INFO');
      else if (step === 'PATIENT_INFO') {
        if (!patientInfo.name || !patientInfo.phone) {
          setErrors({ 
            name: !patientInfo.name ? 'Nome é obrigatório' : '',
            phone: !patientInfo.phone ? 'Telefone é obrigatório' : ''
          });
          return;
        }
        setStep('CONFIRMATION');
      }
    }, 600);
  };

  const filteredServices = SERVICES.filter(s => s.type === selectedType);
  const filteredUnits = UNITS.filter(u => selectedService && u.availableServices.includes(selectedService.id));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">+</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">VidaSaúde</span>
          </div>
          <Button variant="primary" size="sm" onClick={scrollToBooking}>
            Agendar Agora
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl">
              <Badge variant="info">Saúde para todos</Badge>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mt-6 leading-tight">
                Saúde de qualidade <br />
                <span className="text-blue-600 font-black">que cabe no seu bolso.</span>
              </h1>
              <p className="text-lg text-slate-600 mt-6 max-w-lg leading-relaxed">
                Consultas e exames com preços populares, sem burocracia e com atendimento humanizado. Agende em minutos, direto pelo site.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <Button variant="primary" size="lg" onClick={scrollToBooking}>
                  Começar Agendamento
                </Button>
                <Button variant="outline" size="lg">
                  Nossos Preços
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50 -z-10 rounded-l-[100px] hidden lg:block opacity-50" />
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Por que escolher a VidaSaúde?</h2>
              <p className="text-slate-500 mt-4">Simplificamos o acesso à saúde privada com transparência e carinho.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Preço Popular', desc: 'Valores acessíveis em todas as especialidades.', icon: '💰' },
                { title: 'Sem Mensalidade', desc: 'Pague apenas quando usar, sem planos ou taxas.', icon: '✅' },
                { title: 'Agilidade', desc: 'Consultas e exames sem longas filas de espera.', icon: '⚡' }
              ].map((benefit, i) => (
                <Card key={i} className="p-8 hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Scheduling Section */}
        <section ref={bookingRef} className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Agende seu atendimento</h2>
                <p className="text-slate-500 mt-2">Escolha o serviço desejado e finalize em poucos passos.</p>
              </div>

              <Card className="p-6 md:p-10 shadow-xl border-none">
                {isLoading ? (
                  <div className="space-y-6 py-10">
                    <Skeleton className="h-8 w-3/4 mx-auto" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : (
                  <>
                    {/* Step: Service Type */}
                    {step === 'SERVICE_TYPE' && (
                      <div className="space-y-8 animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button 
                            onClick={() => { setSelectedType(ServiceType.CONSULTA); handleNextStep(); }}
                            className="p-8 border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-center group"
                          >
                            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">🩺</span>
                            <span className="text-xl font-bold text-slate-800">Consulta Médica</span>
                            <span className="block text-sm text-slate-500 mt-1">A partir de R$ 80</span>
                          </button>
                          <button 
                            onClick={() => { setSelectedType(ServiceType.EXAME); handleNextStep(); }}
                            className="p-8 border-2 border-slate-100 rounded-2xl hover:border-blue-600 hover:bg-blue-50 transition-all text-center group"
                          >
                            <span className="text-5xl block mb-4 group-hover:scale-110 transition-transform">🔬</span>
                            <span className="text-xl font-bold text-slate-800">Exame</span>
                            <span className="block text-sm text-slate-500 mt-1">A partir de R$ 45</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step: Details (Specialty or Exam) */}
                    {step === 'DETAILS' && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <div className="flex items-center space-x-2 text-sm font-medium text-slate-500">
                          <button onClick={() => setStep('SERVICE_TYPE')} className="hover:text-blue-600">Início</button>
                          <span>/</span>
                          <span className="text-slate-900">{selectedType === ServiceType.CONSULTA ? 'Consulta' : 'Exame'}</span>
                        </div>
                        <h3 className="text-xl font-bold">Qual {selectedType === ServiceType.CONSULTA ? 'especialidade' : 'exame'} você precisa?</h3>
                        <div className="grid gap-3">
                          {filteredServices.map(service => (
                            <button 
                              key={service.id}
                              onClick={() => { setSelectedService(service); handleNextStep(); }}
                              className="p-4 border rounded-xl flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
                            >
                              <div>
                                <div className="font-semibold text-slate-800">{service.name}</div>
                                <div className="text-xs text-slate-500">{service.description}</div>
                              </div>
                              <div className="text-blue-600 font-bold">R$ {service.basePrice.toFixed(2)}</div>
                            </button>
                          ))}
                        </div>
                        <Button variant="ghost" className="w-full" onClick={() => setStep('SERVICE_TYPE')}>Voltar</Button>
                      </div>
                    )}

                    {/* Step: Unit */}
                    {step === 'UNIT' && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <h3 className="text-xl font-bold">Onde você prefere ser atendido?</h3>
                        <div className="grid gap-4">
                          {filteredUnits.length > 0 ? (
                            filteredUnits.map(unit => (
                              <button 
                                key={unit.id}
                                onClick={() => { setSelectedUnit(unit); handleNextStep(); }}
                                className="p-5 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                              >
                                <div className="font-bold text-slate-800">{unit.name}</div>
                                <div className="text-sm text-slate-500 mt-1">{unit.address}</div>
                              </button>
                            ))
                          ) : (
                            <Alert variant="info">Nenhuma unidade disponível para este serviço no momento.</Alert>
                          )}
                        </div>
                        <Button variant="ghost" className="w-full" onClick={() => setStep('DETAILS')}>Voltar</Button>
                      </div>
                    )}

                    {/* Step: Date & Time */}
                    {step === 'DATE_TIME' && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <h3 className="text-xl font-bold">Selecione o melhor horário</h3>
                        {selectedUnit && (
                          <div className="space-y-6">
                            <div>
                              <label className="text-sm font-medium text-slate-600 block mb-2">Data disponível</label>
                              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {Object.keys(selectedUnit.availableHours).map(date => (
                                  <button
                                    key={date}
                                    onClick={() => { setSelectedDate(date); setSelectedTime(''); }}
                                    className={`px-4 py-3 rounded-xl border-2 transition-all shrink-0 text-center min-w-[100px] ${selectedDate === date ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-200'}`}
                                  >
                                    <div className="text-xs uppercase font-bold opacity-60">Dez</div>
                                    <div className="text-xl font-black">{date.split('-')[2]}</div>
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            {selectedDate && (
                              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-sm font-medium text-slate-600 block mb-2">Horários disponíveis</label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                  {selectedUnit.availableHours[selectedDate].map(time => (
                                    <button
                                      key={time}
                                      onClick={() => setSelectedTime(time)}
                                      className={`p-3 rounded-lg border text-sm font-semibold transition-all ${selectedTime === time ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
                                    >
                                      {time}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {selectedService?.preparationInfo && (
                              <Alert title="Informação importante" variant="info">
                                {selectedService.preparationInfo}
                              </Alert>
                            )}

                            <div className="flex gap-4">
                              <Button variant="outline" className="flex-1" onClick={() => setStep('UNIT')}>Voltar</Button>
                              <Button 
                                variant="primary" 
                                className="flex-[2]" 
                                disabled={!selectedTime} 
                                onClick={handleNextStep}
                              >
                                Continuar
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step: Patient Info */}
                    {step === 'PATIENT_INFO' && (
                      <div className="space-y-6 animate-in slide-in-from-right duration-500">
                        <h3 className="text-xl font-bold">Só mais alguns dados</h3>
                        <div className="space-y-4">
                          <Input 
                            label="Seu nome completo" 
                            placeholder="Ex: João da Silva" 
                            value={patientInfo.name}
                            onChange={(e) => {
                              setPatientInfo({...patientInfo, name: e.target.value});
                              if (errors.name) setErrors({...errors, name: ''});
                            }}
                            error={errors.name}
                          />
                          <Input 
                            label="Telefone com DDD (WhatsApp)" 
                            placeholder="(11) 99999-9999" 
                            type="tel"
                            value={patientInfo.phone}
                            onChange={(e) => {
                              setPatientInfo({...patientInfo, phone: e.target.value});
                              if (errors.phone) setErrors({...errors, phone: ''});
                            }}
                            error={errors.phone}
                          />
                          <Input 
                            label="E-mail (Opcional)" 
                            placeholder="seu@email.com" 
                            type="email"
                            value={patientInfo.email}
                            onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                          />
                        </div>
                        <div className="pt-4 flex gap-4">
                          <Button variant="outline" className="flex-1" onClick={() => setStep('DATE_TIME')}>Voltar</Button>
                          <Button variant="primary" className="flex-[2]" onClick={handleNextStep}>Confirmar Agendamento</Button>
                        </div>
                      </div>
                    )}

                    {/* Step: Confirmation */}
                    {step === 'CONFIRMATION' && (
                      <div className="text-center space-y-8 animate-in zoom-in-95 duration-500">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                          ✓
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-slate-900">Agendamento Confirmado!</h3>
                          <p className="text-slate-500 italic text-sm">Parabéns, {patientInfo.name.split(' ')[0]}! Sua saúde agradece.</p>
                        </div>

                        <Card className="bg-slate-50 border-slate-100 p-6 text-left space-y-4">
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-slate-500 text-sm">Serviço</span>
                            <span className="font-bold text-slate-800 uppercase text-sm tracking-wider">{selectedService?.name}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-slate-500 text-sm">Local</span>
                            <span className="font-bold text-slate-800 text-sm">{selectedUnit?.name}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                            <span className="text-slate-500 text-sm">Data e Hora</span>
                            <span className="font-bold text-slate-800 text-sm">{selectedDate.split('-').reverse().join('/')} às {selectedTime}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-500 text-sm">Valor Estimado</span>
                            <span className="text-lg font-black text-blue-600">R$ {selectedService?.basePrice.toFixed(2)}</span>
                          </div>
                        </Card>

                        <div className="bg-blue-50 p-4 rounded-xl text-left border border-blue-100">
                          <p className="text-xs text-blue-800 leading-relaxed">
                            <strong>Próximos passos:</strong> Enviamos um comprovante para o seu WhatsApp. Lembre-se de chegar com 15 minutos de antecedência.
                          </p>
                        </div>

                        <Button variant="outline" className="w-full" onClick={resetBooking}>Realizar outro agendamento</Button>
                      </div>
                    )}
                  </>
                )}
              </Card>

              {/* Security info */}
              <div className="mt-8 flex items-center justify-center space-x-6 text-slate-400 text-xs grayscale opacity-70">
                <span className="flex items-center"><span className="mr-1">🔒</span> Dados Protegidos</span>
                <span className="flex items-center"><span className="mr-1">💬</span> Suporte via WhatsApp</span>
                <span className="flex items-center"><span className="mr-1">⭐</span> +10 mil pacientes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section / FAQ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-slate-900">Perguntas Frequentes</h2>
                <div className="space-y-6">
                  {[
                    { q: "Preciso de pedido médico?", a: "Para consultas, não. Para exames, em alguns casos é necessário. Consulte nossa central se tiver dúvidas." },
                    { q: "Quais as formas de pagamento?", a: "Aceitamos Pix, Dinheiro e Cartões de Crédito (com parcelamento) e Débito diretamente na unidade." },
                    { q: "Como cancelar meu horário?", a: "Você pode cancelar ou remarcar através do link enviado no seu WhatsApp em até 24h antes." }
                  ].map((item, i) => (
                    <div key={i} className="group">
                      <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.q}</h4>
                      <p className="text-slate-600 mt-2 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                  alt="Medical professional" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">+</span>
                </div>
                <span className="font-bold text-xl tracking-tight">VidaSaúde</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Nossa missão é democratizar o acesso à saúde privada de qualidade, com tecnologia e humanização para todos os brasileiros.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Agendamentos</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><button onClick={scrollToBooking} className="hover:text-white transition-colors">Consulta Médica</button></li>
                <li><button onClick={scrollToBooking} className="hover:text-white transition-colors">Exames Laboratoriais</button></li>
                <li><button onClick={scrollToBooking} className="hover:text-white transition-colors">Exames de Imagem</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-slate-500">Unidades</h5>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>Unidade Centro - SP</li>
                <li>Unidade Norte - SP</li>
                <li>Fale Conosco</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
            <p>© 2024 VidaSaúde Serviços Médicos. Todos os direitos reservados.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white">Termos de Uso</a>
              <a href="#" className="hover:text-white">Privacidade (LGPD)</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

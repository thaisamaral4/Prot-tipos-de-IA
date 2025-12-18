
import { Service, ServiceType, Unit } from './types';

export const SERVICES: Service[] = [
  { id: 'c1', type: ServiceType.CONSULTA, name: 'Clínico Geral', description: 'Atendimento preventivo e diagnóstico inicial.', basePrice: 80 },
  { id: 'c2', type: ServiceType.CONSULTA, name: 'Ginecologia', description: 'Saúde da mulher e exames de rotina.', basePrice: 95 },
  { id: 'c3', type: ServiceType.CONSULTA, name: 'Pediatria', description: 'Cuidados especializados para crianças.', basePrice: 90 },
  { id: 'c4', type: ServiceType.CONSULTA, name: 'Ortopedia', description: 'Tratamento de ossos e articulações.', basePrice: 110 },
  { id: 'e1', type: ServiceType.EXAME, name: 'Hemograma Completo', description: 'Análise detalhada do sangue.', basePrice: 45 },
  { id: 'e2', type: ServiceType.EXAME, name: 'Ultrassonografia', description: 'Exame de imagem não invasivo.', basePrice: 120, preparationInfo: 'Comparecer com bexiga cheia.' },
  { id: 'e3', type: ServiceType.EXAME, name: 'Eletrocardiograma', description: 'Avaliação da atividade elétrica cardíaca.', basePrice: 65 },
];

export const UNITS: Unit[] = [
  {
    id: 'u1',
    name: 'Unidade Centro',
    address: 'Rua das Flores, 123 - Centro',
    availableServices: ['c1', 'c2', 'c3', 'c4', 'e1', 'e2', 'e3'],
    availableHours: {
      '2024-12-20': ['08:00', '09:00', '10:00', '14:00', '15:00'],
      '2024-12-21': ['08:30', '09:30', '10:30', '14:30', '15:30'],
    }
  },
  {
    id: 'u2',
    name: 'Unidade Norte',
    address: 'Av. Brasil, 4500 - Jardim América',
    availableServices: ['c1', 'c3', 'e1', 'e3'],
    availableHours: {
      '2024-12-20': ['08:00', '11:00', '16:00'],
      '2024-12-21': ['09:00', '13:00', '17:00'],
    }
  }
];

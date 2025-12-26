
import { ContentItem } from './types';

export const CATEGORIES = [
  "Básicos da IA",
  "Robótica Divertida",
  "Ética & Futuro",
  "IA Criativa",
  "Como as máquinas pensam"
];

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    title: 'O que é um Neurônio Artificial?',
    thumbnail: 'https://picsum.photos/seed/ai1/800/450',
    duration: '5 min',
    description: 'Aprenda como o seu cérebro e o computador podem ser parecidos.',
    category: 'Básicos da IA',
    ageRating: '7+',
    type: 'video',
    progress: 80
  },
  {
    id: '2',
    title: 'IA na Natureza',
    thumbnail: 'https://picsum.photos/seed/ai2/800/450',
    duration: '12 min',
    description: 'Explorando como cientistas copiam a natureza para criar IA.',
    category: 'Básicos da IA',
    ageRating: '7+',
    type: 'video'
  },
  {
    id: '3',
    title: 'Laboratório de Prompts',
    thumbnail: 'https://picsum.photos/seed/ai3/800/450',
    duration: 'Interativo',
    description: 'Crie suas próprias artes usando comandos mágicos para a IA.',
    category: 'IA Criativa',
    ageRating: '7+',
    type: 'interactive'
  },
  {
    id: '4',
    title: 'Robôs que Sentem?',
    thumbnail: 'https://picsum.photos/seed/ai4/800/450',
    duration: '8 min',
    description: 'Será que um robô pode ter sentimentos? Vamos descobrir.',
    category: 'Ética & Futuro',
    ageRating: '12+',
    type: 'video'
  },
  {
    id: '5',
    title: 'Detetive de Fake News',
    thumbnail: 'https://picsum.photos/seed/ai5/800/450',
    duration: '15 min',
    description: 'Use a lógica para descobrir o que é real e o que foi feito por IA.',
    category: 'Como as máquinas pensam',
    ageRating: '12+',
    type: 'game'
  },
  {
    id: '6',
    title: 'Construindo seu Primeiro Chatbot',
    thumbnail: 'https://picsum.photos/seed/ai6/800/450',
    duration: '20 min',
    description: 'Um guia passo a passo para adultos e crianças curiosas.',
    category: 'IA Criativa',
    ageRating: 'Adulto',
    type: 'interactive'
  }
];

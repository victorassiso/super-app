import { cameras } from './cameras'

export const projects = [
  {
    id: '1',
    name: 'Projeto 1',
    cameras: cameras.slice(0, 5),
    model: 'Detecção de Pessoas',
    active: true,
  },
  {
    id: '2',
    name: 'Projeto 2',
    cameras: cameras.slice(5, 10),
    model: 'Detecção de Pessoas',
    active: true,
  },
  {
    id: '3',
    name: 'Projeto 3',
    cameras: cameras.slice(10, 50),
    model: 'Detecção de Algomerações',
    active: false,
  },
]

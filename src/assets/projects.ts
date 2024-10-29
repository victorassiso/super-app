import { cameras } from './cameras'
import { models } from './models'

export const projects = [
  {
    id: '1',
    name: 'Projeto 1',
    description: 'Descrição do projeto 1',
    cameras: cameras.slice(0, 99),
    model: {
      id: models[0].id,
      name: models[0].name,
    },
    active: true,
  },
  {
    id: '2',
    name: 'Projeto 2',
    description: 'Descrição do projeto 2',
    cameras: cameras.slice(100, 199),
    model: {
      id: models[1].id,
      name: models[1].name,
    },
    active: true,
  },
  {
    id: '3',
    name: 'Projeto 3',
    description: 'Descrição do projeto 3',
    cameras: cameras.slice(200, 299),
    model: {
      id: models[2].id,
      name: models[2].name,
    },
    active: false,
  },
  {
    id: '4',
    name: 'Projeto 4',
    description: 'Descrição do projeto 4',
    cameras: cameras.slice(300, 399),
    model: {
      id: models[3].id,
      name: models[3].name,
    },
    active: true,
  },
]

import type { LayersList, PickingInfo } from '@deck.gl/core'
import { IconLayer } from '@deck.gl/layers'
import { useMemo, useState } from 'react'

import cameraIconAtlas from '@/assets/camera-icon-atlas.png'
import { cameras } from '@/assets/cameras'
import type { Camera, Project } from '@/models/entities'

interface UseCameraLayer {
  hoverInfo: PickingInfo<Camera> | null
  setHoverInfo: (info: PickingInfo<Camera> | null) => void
  selectedCameras: Camera[]
  setSelectedCameras: (cameras: Camera[]) => void
  projects: Project[]
  setProjects: (projects: Project[]) => void
  layers: LayersList
  iconColors: Record<string, { label: string; hex: string }>
}
export function useCameraLayer(): UseCameraLayer {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<Camera> | null>(null)
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([])
  const [projects, setProjects] = useState<Project[]>([
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
  ])

  const iconColors = {
    green: {
      label: 'Verde',
      hex: '#00bf63',
    },
    'light-green': {
      label: 'Verde Claro',
      hex: '#c1ff72',
    },
    purple: {
      label: 'Roxo',
      hex: '#8c52ff',
    },
    lavender: {
      label: 'Lavanda',
      hex: '#cb6ce6',
    },
    orange: {
      label: 'Laranja',
      hex: '#ff914d',
    },
    yellow: {
      label: 'Amarelo',
      hex: '#ffde59',
    },
    red: {
      label: 'Vermelho',
      hex: '#ff3131',
    },
    'light-blue': {
      label: 'Azul Claro',
      hex: '#5ce1e6',
    },
    'dark-teal': {
      label: 'Azul Escuro',
      hex: '#0097b2',
    },
    gray: {
      label: 'Cinza',
      hex: '#a6a6a6',
    },
  } as const

  const baseLayer = useMemo(
    () =>
      new IconLayer<Camera>({
        id: 'cameras',
        data: cameras,
        pickable: true,
        getSize: 24,
        autoHighlight: true,
        highlightColor: [7, 76, 128, 250], // CIVITAS-dark-blue
        visible: true,
        iconAtlas: cameraIconAtlas.src,
        iconMapping: {
          default: {
            x: 0,
            y: 0,
            width: 48,
            height: 48,
            mask: false,
          },
          highlighted: {
            x: 48,
            y: 0,
            width: 48,
            height: 48,
            mask: false,
          },
        },
        getIcon: (d) => {
          if (selectedCameras.find((c) => c.CameraCode === d.CameraCode)) {
            return 'highlighted'
          }

          return 'default'
        },
        getPosition: (d) => [d.Longitude, d.Latitude],
        onHover: (d) => {
          setHoverInfo(d)
        },
        onClick: (d) => {
          setSelectedCameras((prev) => {
            if (prev.find((c) => c.CameraCode === d.object.CameraCode)) {
              return prev.filter((c) => c.CameraCode !== d.object.CameraCode)
            }
            return [...prev, d.object]
          })
        },
      }),
    [selectedCameras],
  )

  return {
    hoverInfo,
    setHoverInfo,
    selectedCameras,
    setSelectedCameras,
    projects,
    setProjects,
    layers: [baseLayer],
    iconColors,
  }
}

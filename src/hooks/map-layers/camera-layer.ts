'use client'

import type { LayersList, PickingInfo } from '@deck.gl/core'
import { IconLayer } from '@deck.gl/layers'
import { useEffect, useMemo, useState } from 'react'

import cameraIconAtlas from '@/assets/camera-icon-atlas.png'
import type { Camera } from '@/models/entities'
import { getCamerasAction } from '@/server-cache/cameras'

export interface UseCameraLayer {
  cameras: Camera[]
  hoverInfo: PickingInfo<Camera> | null
  setHoverInfo: (info: PickingInfo<Camera> | null) => void
  selectedCameras: Camera[]
  setSelectedCameras: (cameras: Camera[]) => void
  layers: LayersList
}
export function useCameraLayer(): UseCameraLayer {
  const [hoverInfo, setHoverInfo] = useState<PickingInfo<Camera> | null>(null)
  const [selectedCameras, setSelectedCameras] = useState<Camera[]>([])
  const [cameras, setCameras] = useState<Camera[]>([])

  useEffect(() => {
    const fetchCameras = async () => {
      const data = await getCamerasAction()
      setCameras(data)
    }
    fetchCameras()
  }, [])

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
          if (selectedCameras.find((c) => c.id === d.id)) {
            return 'highlighted'
          }

          return 'default'
        },
        getPosition: (d) => [d.longitude, d.latitude],
        onHover: (d) => {
          setHoverInfo(d)
        },
        onClick: (d) => {
          setSelectedCameras((prev) => {
            if (prev.find((c) => c.id === d.object.id)) {
              return prev.filter((c) => c.id !== d.object.id)
            }
            return [...prev, d.object]
          })
        },
      }),
    [selectedCameras, cameras],
  )

  return {
    cameras,
    hoverInfo,
    setHoverInfo,
    selectedCameras,
    setSelectedCameras,
    layers: [baseLayer],
  }
}

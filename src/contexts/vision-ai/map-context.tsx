'use client'

import { createContext } from 'react'

import {
  type UseCameraLayer,
  useCameraLayer,
} from '@/hooks/map-layers/camera-layer'

interface VisionAIMapContextProps {
  layers: {
    cameras: UseCameraLayer
  }
}

export const VisionAIMapContext = createContext({} as VisionAIMapContextProps)

export function VisionAIMapContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cameras = useCameraLayer()

  return (
    <VisionAIMapContext.Provider
      value={{
        layers: {
          cameras,
        },
      }}
    >
      {children}
    </VisionAIMapContext.Provider>
  )
}

'use client'

import { FlyToInterpolator, type MapViewState } from '@deck.gl/core'
import { createContext, useCallback, useState } from 'react'

import {
  type UseCameraLayer,
  useCameraLayer,
} from '@/hooks/map-layers/camera-layer'
import { RIO_VIEWSTATE } from '@/utils/map/rio-viewstate'

interface VisionAIMapContextProps {
  layers: {
    cameras: UseCameraLayer
  }
  viewState: MapViewState
  setViewState: (viewState: MapViewState) => void
  flyTo: (destination: Partial<MapViewState>) => void
}

export const VisionAIMapContext = createContext({} as VisionAIMapContextProps)

export function VisionAIMapContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const cameras = useCameraLayer()
  const [viewState, setViewState] = useState<MapViewState>(RIO_VIEWSTATE)

  const flyTo = useCallback((destination: Partial<MapViewState>) => {
    setViewState((currentViewState) => ({
      ...currentViewState,
      ...destination,
      transitionDuration: 'auto',
      transitionInterpolator: new FlyToInterpolator(),
    }))
  }, [])

  return (
    <VisionAIMapContext.Provider
      value={{
        layers: {
          cameras,
        },
        viewState,
        setViewState,
        flyTo,
      }}
    >
      {children}
    </VisionAIMapContext.Provider>
  )
}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import DeckGL from '@deck.gl/react'
import { useCallback, useContext, useRef } from 'react'
import { Map as MapGL, type MapRef } from 'react-map-gl'

import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'

import { CameraHoverCard } from './components/tooltip/components/camera-hover-card'

interface MapProps {
  mapboxAccessToken: string
}

export default function Map({ mapboxAccessToken }: MapProps) {
  const {
    layers: {
      cameras: { layers, hoverInfo, setIsHoveringInfoCard },
    },
    viewState,
    setViewState,
  } = useContext(VisionAIMapContext)

  const mapRef = useRef<MapRef | null>(null)

  const onViewStateChange = useCallback(
    ({ viewState }: { viewState: any }) => {
      setViewState(viewState)
    },
    [setViewState],
  )

  return (
    <div className="h-full w-full relative">
      <DeckGL
        initialViewState={viewState}
        controller={true}
        layers={layers}
        viewState={viewState}
        onViewStateChange={onViewStateChange}
        getCursor={({ isDragging, isHovering }) => {
          if (isDragging) return 'grabbing'
          else if (isHovering) {
            // Actually clickable objects:
            if (hoverInfo?.object) return 'pointer'
          }
          return 'grab'
        }}
      >
        <MapGL
          ref={mapRef}
          mapStyle={'mapbox://styles/mapbox/light-v10'}
          mapboxAccessToken={mapboxAccessToken}
        />
        <CameraHoverCard
          hoveredObject={hoverInfo}
          setIsHoveringInfoCard={setIsHoveringInfoCard}
        />
      </DeckGL>
    </div>
  )
}

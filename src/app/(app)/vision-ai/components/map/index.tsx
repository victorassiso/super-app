/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import DeckGL from '@deck.gl/react'
import { useCallback, useContext, useRef } from 'react'
import { Map as MapGL, type MapRef } from 'react-map-gl'

import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'
import { env } from '@/env'

import { Tooltip } from './components/tooltip'

export default function Map() {
  const {
    layers: {
      cameras: { layers, hoverInfo },
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
      >
        <MapGL
          ref={mapRef}
          mapStyle={'mapbox://styles/mapbox/light-v10'}
          mapboxAccessToken={env.MAPBOX_ACCESS_TOKEN}
        />
        <Tooltip info={hoverInfo} />
      </DeckGL>
    </div>
  )
}

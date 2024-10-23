/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import 'mapbox-gl/dist/mapbox-gl.css'

import { type LayersList, type PickingInfo } from '@deck.gl/core'
import DeckGL from '@deck.gl/react'
import { Map as MapGL } from 'react-map-gl'

import { env } from '@/env'
import type { Camera } from '@/models/entities'
import { RIO_VIEWSTATE } from '@/utils/map/rio-viewstate'

import { Tooltip } from './components/tooltip'

interface MapProps {
  layers: LayersList
  hoverInfo: PickingInfo<Camera> | null
  setSelectedCameras: (cameras: Camera[]) => void
  selectedCameras: Camera[]
}

export default function Map({ layers, hoverInfo }: MapProps) {
  return (
    <div className="h-full w-full relative">
      <DeckGL initialViewState={RIO_VIEWSTATE} controller layers={layers}>
        <MapGL
          mapStyle={'mapbox://styles/mapbox/light-v10'}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        />
        <Tooltip info={hoverInfo} />
      </DeckGL>
    </div>
  )
}

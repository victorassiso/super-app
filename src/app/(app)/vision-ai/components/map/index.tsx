'use client'

import 'mapbox-gl/dist/mapbox-gl.css'

import DeckGL from '@deck.gl/react'
import { useContext } from 'react'
import { Map as MapGL } from 'react-map-gl'

import { VisionAIMapContext } from '@/contexts/vision-ai/map-context'
import { env } from '@/env'
import { RIO_VIEWSTATE } from '@/utils/map/rio-viewstate'

import { Tooltip } from './components/tooltip'

export default function Map() {
  const {
    layers: {
      cameras: { layers, hoverInfo },
    },
  } = useContext(VisionAIMapContext)

  return (
    <div className="h-full w-full relative">
      <DeckGL initialViewState={RIO_VIEWSTATE} controller layers={layers}>
        <MapGL
          mapStyle={'mapbox://styles/mapbox/light-v10'}
          mapboxAccessToken={env.MAPBOX_ACCESS_TOKEN}
        />
        <Tooltip info={hoverInfo} />
      </DeckGL>
    </div>
  )
}

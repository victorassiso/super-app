'use client'

import { useCameraLayer } from '@/hooks/map-layers/camera-layer'

import Map from './components/map'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { hoverInfo, layers, selectedCameras, setSelectedCameras } =
    useCameraLayer()
  return (
    <div className="h-full w-full flex">
      <Map
        hoverInfo={hoverInfo}
        layers={layers}
        selectedCameras={selectedCameras}
        setSelectedCameras={setSelectedCameras}
      />
      <div className="w-[600px] h-full px-4 py-2 space-y-4">{children}</div>
    </div>
  )
}

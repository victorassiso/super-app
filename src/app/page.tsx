'use client'

import { useCameraLayer } from '@/hooks/map-layers/camera-layer'

import Map from './components/map'
import { SidePanel } from './components/side-panel'

export default function App() {
  const {
    hoverInfo,
    layers,
    projects,
    selectedCameras,
    setProjects,
    setSelectedCameras,
    iconColors,
  } = useCameraLayer()

  return (
    <div className="h-full w-full flex">
      <Map
        hoverInfo={hoverInfo}
        layers={layers}
        selectedCameras={selectedCameras}
        setSelectedCameras={setSelectedCameras}
      />
      <SidePanel
        selectedCameras={selectedCameras}
        setSelectedCameras={setSelectedCameras}
        projects={projects}
        setProjects={setProjects}
        iconColors={iconColors}
      />
    </div>
  )
}

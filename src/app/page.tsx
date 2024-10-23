import { Map } from './components/map'
import { SidePanel } from './components/side-panel'

export default function Page() {
  return (
    <div className="flex h-full w-full bg-yellow-500">
      <Map />
      <SidePanel />
    </div>
  )
}

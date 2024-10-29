import { VisionAIMapContextProvider } from '@/contexts/vision-ai/map-context'

import Map from './components/map'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full w-full flex">
      <VisionAIMapContextProvider>
        <Map />
        <div className="w-[600px] h-full px-4 py-2 space-y-4">{children}</div>
      </VisionAIMapContextProvider>
    </div>
  )
}

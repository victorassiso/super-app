import type { PickingInfo } from '@deck.gl/core'

import type { Camera } from '@/models/entities'

interface TooltipProps {
  info?: PickingInfo<Camera> | null
}
export function Tooltip({ info }: TooltipProps) {
  if (info && info.object) {
    const top = info.y
    const left = info.x

    return (
      <div
        className="z-10 absolute pointer-events-none bg-card p-2 rounded-lg"
        style={{ top, left }}
      >
        <span>{info.object.name}</span>
      </div>
    )
  }

  return null
}

import type { ReactNode } from 'react'

import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface TooltipProps {
  children: ReactNode
  text?: string
  side?: 'left' | 'right' | 'bottom' | 'top'
  disabled?: boolean
  className?: string
  asChild?: boolean
  hideContent?: boolean
  disabledText?: string
  render?: JSX.Element
  type?: 'button'
}

export function Tooltip({
  children,
  text,
  side,
  disabled = false,
  className = '',
  asChild = false,
  hideContent = false,
  disabledText,
  render,
  type = 'button',
}: TooltipProps) {
  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={0}>
      <TooltipRoot>
        <TooltipTrigger type={type} asChild={asChild}>
          {children}
        </TooltipTrigger>
        {!hideContent && (
          <TooltipContent
            side={side}
            className={cn('max-w-sm text-justify', className)}
            sideOffset={20}
          >
            {render || (
              <p className="whitespace-pre-wrap">
                {disabled && disabledText ? disabledText : text}
              </p>
            )}
          </TooltipContent>
        )}
      </TooltipRoot>
    </TooltipProvider>
  )
}

import * as React from "react"

export interface TooltipProviderProps {
  children: React.ReactNode
}

export const TooltipProvider = ({ children }: TooltipProviderProps) => {
  return <>{children}</>
}


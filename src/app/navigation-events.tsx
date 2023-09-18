'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useProgress } from "src/providers/progress";
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setProgress } = useProgress();
 
  useEffect(() => {
    setProgress(true)
    const url = `${pathname}?${searchParams}`
    console.log("Nav:", url)
    // You can now use the current URL
    // ...
    setProgress(false)
  }, [pathname, searchParams])
  
 
  return null
}
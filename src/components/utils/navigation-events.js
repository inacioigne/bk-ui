'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useProgress } from "src/providers/progress";
 
export function NavigationEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { progress, setProgress } = useProgress();

 
  useEffect(() => {
    const url = `${pathname}?${searchParams}`
    setProgress(false)
    // console.log(url)
  }, [pathname, searchParams])
 
  return null
}
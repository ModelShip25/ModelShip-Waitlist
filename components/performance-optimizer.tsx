"use client"

import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
    ]

    preloadLinks.forEach(({ href, as, type, crossOrigin }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      if (crossOrigin) link.crossOrigin = crossOrigin
      document.head.appendChild(link)
    })

    // Lazy load non-critical images
    const lazyImages = document.querySelectorAll('img[data-src]')
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          img.src = img.dataset.src!
          img.classList.remove('lazy')
          imageObserver.unobserve(img)
        }
      })
    })

    lazyImages.forEach((img) => imageObserver.observe(img))

    // Optimize animations for performance
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0.1s')
    }

    // Preload critical CSS
    const criticalCSS = document.createElement('link')
    criticalCSS.rel = 'preload'
    criticalCSS.href = '/globals.css'
    criticalCSS.as = 'style'
    document.head.appendChild(criticalCSS)

    // Optimize scroll performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Handle scroll optimizations here
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => {
      imageObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
} 
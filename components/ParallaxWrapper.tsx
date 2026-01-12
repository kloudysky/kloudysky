"use client";

import { useEffect, useState, ReactNode, useCallback } from 'react';

interface ParallaxWrapperProps {
  children: ReactNode;
  intensity?: number;
  mobileIntensity?: number; // separate intensity for mobile (more exaggerated)
  className?: string;
}

export default function ParallaxWrapper({
  children,
  intensity = 1,
  mobileIntensity = 1.2, // slightly more than desktop
  className = ''
}: ParallaxWrapperProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // Smooth the accelerometer values
  const smoothOffset = useCallback((newX: number, newY: number) => {
    setOffset(prev => ({
      x: prev.x + (newX - prev.x) * 0.15,
      y: prev.y + (newY - prev.y) * 0.15,
    }));
  }, []);

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(checkMobile);

    if (checkMobile && typeof DeviceOrientationEvent !== 'undefined') {
      // iOS 13+ requires permission
      const requestPermission = async () => {
        if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function') {
          try {
            const permission = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
            setHasPermission(permission === 'granted');
          } catch {
            setHasPermission(false);
          }
        } else {
          // Non-iOS or older iOS - permission not required
          setHasPermission(true);
        }
      };

      // Auto-request on first interaction for iOS
      const handleFirstInteraction = () => {
        requestPermission();
        window.removeEventListener('touchstart', handleFirstInteraction);
      };

      window.addEventListener('touchstart', handleFirstInteraction, { once: true });

      // Check if already has permission (non-iOS)
      if (typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission !== 'function') {
        setHasPermission(true);
      }

      return () => window.removeEventListener('touchstart', handleFirstInteraction);
    }
  }, []);

  useEffect(() => {
    if (isMobile && hasPermission) {
      // Mobile: use device orientation (accelerometer/gyroscope)
      const handleOrientation = (e: DeviceOrientationEvent) => {
        // gamma: left/right tilt (-90 to 90)
        // beta: front/back tilt (-180 to 180)
        const gamma = e.gamma || 0;
        const beta = e.beta || 0;

        // Normalize to -1 to 1 range and apply intensity
        // Clamp values for reasonable range
        const normalizedX = Math.max(-1, Math.min(1, gamma / 30));
        const normalizedY = Math.max(-1, Math.min(1, (beta - 45) / 30)); // offset by 45 for natural phone holding angle

        smoothOffset(
          normalizedX * 18 * mobileIntensity,
          normalizedY * 14 * mobileIntensity
        );
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    } else if (!isMobile) {
      // Desktop: use mouse
      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const normalizedX = (e.clientX - centerX) / centerX;
        const normalizedY = (e.clientY - centerY) / centerY;

        setOffset({
          x: normalizedX * 20 * intensity,
          y: normalizedY * 15 * intensity,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isMobile, hasPermission, intensity, mobileIntensity, smoothOffset]);

  return (
    <div
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isMobile ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {children}
    </div>
  );
}

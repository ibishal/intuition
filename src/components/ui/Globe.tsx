import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 4.7;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 800,
      height: 800,
      phi: 4.7,
      theta: 0.1,
      dark: 1,
      diffuse: 2,
      mapSamples: 16000,
      mapBrightness: 4,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.9, 0.5, 0.1],
      glowColor: [0.05, 0.05, 0.05],
      markers: [
        { location: [37.7749, -122.4194], size: 0.08 }, // SF
        { location: [40.7128, -74.0060], size: 0.04 }, // NY
        { location: [51.5074, -0.1278], size: 0.04 }, // London
        { location: [35.6762, 139.6503], size: 0.04 }, // Tokyo
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.002;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,150,50,0.05)_0%,transparent_50%)] pointer-events-none" />
      <canvas
        ref={canvasRef}
        style={{
          width: 500,
          height: 500,
          maxWidth: "100%",
          aspectRatio: 1,
        }}
      />
    </div>
  );
}

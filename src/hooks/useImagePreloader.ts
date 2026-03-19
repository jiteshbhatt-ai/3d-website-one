"use client";

import { useState, useEffect } from 'react';

export const useImagePreloader = (frameCount: number, path: string) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    const loadedImages: HTMLImageElement[] = [];
    
    // We intentionally load these in parallel with slight throttling 
    // to not freeze the main thread but be as fast as possible.
    const loadImages = async () => {
      const batchSize = 20;
      
      for (let i = 1; i <= frameCount; i += batchSize) {
        if (isCancelled) break;
        
        const batch = [];
        for(let j = 0; j < batchSize && (i + j) <= frameCount; j++) {
           batch.push(new Promise<void>((resolve) => {
              const img = new Image();
              img.onload = () => {
                if (isCancelled) { resolve(); return; }
                loadedImages[i + j - 1] = img;
                setLoadedCount((prev) => prev + 1);
                resolve();
              };
              img.onerror = () => {
                if (isCancelled) { resolve(); return; }
                console.error(`Failed to load image ${i + j}`);
                // Increment loaded count even if error so we don't stall the loading bar permanently
                setLoadedCount((prev) => prev + 1);
                resolve(); 
              };
              img.src = `${path}${(i + j).toString().padStart(4, '0')}.jpg`;
           }));
        }
        await Promise.all(batch);
      }

      if (!isCancelled) {
        // filter out any failed loads
        setImages(loadedImages.filter(Boolean));
      }
    };

    // Reset state when effect initializes in strict mode
    setLoadedCount(0);
    loadImages();

    return () => {
      isCancelled = true;
    };
  }, [frameCount, path]);

  return { images, loadedCount, isComplete: loadedCount >= frameCount };
};

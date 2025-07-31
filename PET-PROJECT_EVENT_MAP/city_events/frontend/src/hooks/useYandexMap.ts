import { useEffect, useRef } from 'react';

export const useYandexMap = (onReady: (ymaps: any, map: any) => void) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.751244, 37.618423],
          zoom: 11,
        });
        onReady(window.ymaps, map);
      });
    }
  }, [onReady]);

  return mapRef;
};
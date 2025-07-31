import type { AppProps } from 'next/app';
import { MapProvider } from '../contexts/MapContext';
import { AuthProvider } from '../contexts/AuthContext';
import { UIProvider } from '../contexts/UIContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <MapProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </MapProvider>
    </AuthProvider>
  );
}

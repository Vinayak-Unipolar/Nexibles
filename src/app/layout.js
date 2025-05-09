"use client";

import './globals.css';
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/utils/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextInputProvider } from '../utils/TextInputProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store/store';
import ServerLayout from './server-layout';
import Whatsapp from '@/components/Whatsapp';

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ServerLayout>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <TextInputProvider>
              <div className="relative">
                {children}
                <ToastContainer />
                <Whatsapp />
              </div>
            </TextInputProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ServerLayout>
  );
}

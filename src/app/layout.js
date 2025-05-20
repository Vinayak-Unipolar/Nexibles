// RootLayout.jsx
'use client';

import './globals.css';
import { motion } from 'framer-motion'; 
import { AuthProvider } from '@/utils/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextInputProvider } from '../utils/TextInputProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store/store';
import ServerLayout from './server-layout';
import Whatsapp from '@/components/Whatsapp';
import SettingsButton from '@/components/SettingsButton'; 
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  // Optional: If you're seeing multiple toast containers,
  // ensure there's only one by checking for existing containers
  useEffect(() => {
    // Remove any duplicate toast containers that might exist
    const toastContainers = document.querySelectorAll('.Toastify');
    if (toastContainers.length > 1) {
      for (let i = 1; i < toastContainers.length; i++) {
        toastContainers[i].remove();
      }
    }
  }, []);

  return (
    <ServerLayout>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <TextInputProvider>
              <div className="relative min-h-screen">
                {children}
                      <GoogleAnalytics />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="fixed bottom-24 right-0 transform -translate-y-1/2 flex justify-end p-5 z-40"
                >
                  <SettingsButton />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="fixed bottom-4 right-0 flex justify-end p-5 z-40"
                >
                  <Whatsapp />
                </motion.div>
                <ToastContainer
                />
              </div>
            </TextInputProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ServerLayout>
  );
}
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
import { useEffect } from 'react';

// Import this line - add toast style overrides
import '../components/toastify/toast-overrides.css'; 

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
                
                {/* Settings Button - Vertically Centered */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="fixed bottom-24 right-0 transform -translate-y-1/2 flex justify-end p-5 z-40"
                >
                  <SettingsButton />
                </motion.div>
                
                {/* WhatsApp Button - Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="fixed bottom-4 right-0 flex justify-end p-5 z-40"
                >
                  <Whatsapp />
                </motion.div>
                
                {/* Single ToastContainer with custom settings */}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  className="custom-toast-container z-50" // Add custom class for better targeting
                  toastClassName="custom-toast" // Global class for all toasts
                  bodyClassName="custom-toast-body" // Global class for toast body
                  closeButton={true}
                  limit={3}
                />
              </div>
            </TextInputProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ServerLayout>
  );
}
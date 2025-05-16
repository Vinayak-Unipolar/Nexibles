"use client";

import './globals.css';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
              <div className="relative min-h-screen overflow-hidden">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div 
                      key="loader"
                      className="flex items-center justify-center min-h-screen"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div 
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1],
                        }} 
                        transition={{ 
                          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="min-h-screen"
                    >
                      {children}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {!isLoading && (
                  <>
                    {/* Settings Button - Vertically Centered */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="fixed top-[45%] right-0 transform -translate-y-1/2 flex justify-end p-5 z-40"
                    >
                      <SettingsButton />
                    </motion.div>

                    {/* WhatsApp Button - Bottom Right */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="fixed bottom-2 right-0 flex justify-end p-5 z-40"
                    >
                      <Whatsapp />
                    </motion.div>
                  </>
                )}
                
                <ToastContainer 
                  position="bottom-center" 
                  autoClose={5000} 
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </TextInputProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ServerLayout>
  );
}
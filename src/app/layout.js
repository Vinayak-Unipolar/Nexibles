// app/layout.js
"use client";
import './globals.css';
import { AuthProvider } from '@/utils/authContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextInputProvider } from '../utils/TextInputProvider';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store/store';
import ServerLayout from './server-layout';

export default function RootLayout({ children }) {
  return (
    <ServerLayout>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <TextInputProvider>
              <div>
                {children}
              </div>
              <ToastContainer />
            </TextInputProvider>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </ServerLayout>
  );
}
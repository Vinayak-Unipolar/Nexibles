'use client'

import { useState, useEffect, createContext, useContext } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

// Create Toast Context
const ToastContext = createContext(null);

// Toast types with unique styling configurations
const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-gradient-to-br from-emerald-400 to-green-500',
    textColor: 'text-white',
    shadowColor: 'shadow-emerald-200',
    progressColor: 'bg-white',
    accentColor: 'bg-emerald-300'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-gradient-to-br from-red-400 to-rose-500',
    textColor: 'text-white',
    shadowColor: 'shadow-red-200',
    progressColor: 'bg-white',
    accentColor: 'bg-red-300'
  },
  info: {
    icon: Info,
    bgColor: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    textColor: 'text-white',
    shadowColor: 'shadow-blue-200',
    progressColor: 'bg-white',
    accentColor: 'bg-blue-300'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
    textColor: 'text-white',
    shadowColor: 'shadow-amber-200',
    progressColor: 'bg-white',
    accentColor: 'bg-amber-300'
  }
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    return id;
  };

  const removeToast = (id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  const contextValue = {
    toasts,
    addToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return {
    success: (message, duration) => context.addToast(message, 'success', duration),
    error: (message, duration) => context.addToast(message, 'error', duration),
    info: (message, duration) => context.addToast(message, 'info', duration),
    warning: (message, duration) => context.addToast(message, 'warning', duration),
    remove: (id) => context.removeToast(id)
  };
};

// Fixed: Individual Toast Component with properly working progress bar
const Toast = ({ id, message, type, duration, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);
  const { icon: Icon, bgColor, textColor, shadowColor, progressColor, accentColor } = TOAST_TYPES[type] || TOAST_TYPES.info;

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    // Animation frame for smooth progress bar
    let animationFrame;
    
    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;
      
      setProgress(newProgress);
      
      if (newProgress > 0) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrame = requestAnimationFrame(updateProgress);
    
    // Set timeout for removing toast
    const timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(id), 500); // Wait for exit animation
    }, duration);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [id, duration, onRemove]);

  return (
    <div 
      className={`relative transform transition-all duration-500 ease-in-out
                 ${isExiting ? 'opacity-0 translate-x-6 rotate-3' : 'opacity-100 translate-x-0 rotate-0'}`}
    >
      {/* Main toast container with improved shape */}
      <div 
        className={`flex items-center py-4 px-4 pl-5 pr-10 ml-3 mb-4 rounded-xl 
                   ${bgColor} ${textColor} ${shadowColor} shadow-lg backdrop-blur-sm
                   w-full max-w-sm transform hover:scale-102 transition-transform duration-200
                   border border-white/20`}
        role="alert"
      >
        {/* Icon section with improved styling */}
        <div className="flex-shrink-0 p-2 mr-3 bg-white/20 rounded-full">
          <Icon size={20} className="drop-shadow" />
        </div>
        
        {/* Message section */}
        <p className="text-sm font-medium pr-4">{message}</p>
        
        {/* Close button with improved design */}
        <button 
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => onRemove(id), 500);
          }} 
          className="absolute top-2 right-2 text-white opacity-80 hover:opacity-100 focus:outline-none transition-opacity duration-200
                     bg-white/10 rounded-full p-1 hover:bg-white/20"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
        
        {/* Fixed: Progress indicator that animates smoothly */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden flex bg-black/10">
          <div 
            className={`${progressColor} h-full opacity-70`}
            style={{ 
              width: `${progress}%`, 
              transition: 'width 0.1s linear',
              filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.7))'
            }}
          />
        </div>
      </div>
      
      {/* Decorative accent */}
      <div className={`absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-16 ${accentColor} rounded-full opacity-80 shadow-md`}></div>
    </div>
  );
};

// Toast Container Component with improved positioning
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      <style jsx global>{`
        @keyframes float-in {
          0% { transform: translateY(-20px) scale(0.8) rotate(-2deg); opacity: 0; }
          50% { transform: translateY(10px) scale(1.05) rotate(1deg); opacity: 0.8; }
          100% { transform: translateY(0) scale(1) rotate(0); opacity: 1; }
        }
      `}</style>
      {toasts.map(toast => (
        <Toast 
          key={toast.id} 
          {...toast} 
          onRemove={removeToast} 
        />
      ))}
    </div>
  );
};
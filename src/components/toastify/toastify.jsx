// Individual Toast Component
const Toast = ({ id, message, type, duration, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let interval;
    let timeout;
    
    // Progress bar update
    interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevProgress - (100 / (duration / 10));
      });
    }, 10);
    
    // Exit animation before remove
    timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(id), 500); // Wait for animation to finish
    }, duration - 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [id, duration, onRemove]);

  const { icon: Icon, bgColor, textColor, shadowColor, progressColor, accentColor } = TOAST_TYPES[type] || TOAST_TYPES.info;

  return (
    <div 
      className={`relative transform transition-all duration-500 ease-in-out
                 ${isExiting ? 'opacity-0 translate-x-6 rotate-3' : 'opacity-100 translate-x-0 rotate-0'}`}
      style={{
        animation: 'float-in 0.5s ease-out',
        transformOrigin: 'center top'
      }}
    >
      {/* Main toast container with improved shape */}
      <div 
        className={`relative flex items-center py-4 px-4 pl-5 pr-10 ml-3 mb-4 rounded-xl 
                   ${bgColor} ${textColor} ${shadowColor} shadow-lg backdrop-blur-sm
                   w-full max-w-sm transform hover:scale-102 transition-transform duration-200
                   border border-white/20`}
        role="alert"
      >
        {/* Decorative accent - now positioned inside the main container */}
        <div className={`absolute -left-3 top-1/2 transform -translate-y-1/2 w-2 h-16 ${accentColor} rounded-full opacity-80 shadow-md`}></div>
        
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
        
        {/* Enhanced Progress indicator with white color */}
        <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden flex bg-black/10">
          <div 
            className={`${progressColor} h-full opacity-70`}
            style={{ 
              width: `${progress}%`, 
              transition: 'width 10ms linear',
              filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.7))'
            }}
          />
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Settings, X, Sun, Moon, Volume2, VolumeX } from 'lucide-react';

interface SettingsPanelProps {
  onToggleTheme?: () => void;
  onToggleSound?: () => void;
  isDarkMode?: boolean;
  isSoundEnabled?: boolean;
}

const SettingsPanel = ({ 
  onToggleTheme, 
  onToggleSound, 
  isDarkMode = true, 
  isSoundEnabled = false 
}: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-24 z-40 p-3 rounded-full backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        }}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Panel */}
      <div 
        className={`fixed top-20 right-8 z-40 w-72 p-6 rounded-xl backdrop-blur-lg border border-white/10 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Settings</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-white/90">Theme</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              <span className="text-sm text-white/90">
                {isDarkMode ? 'Dark' : 'Light'}
              </span>
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-white/90">Sound</span>
            <button
              onClick={onToggleSound}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-sm text-white/90">
                {isSoundEnabled ? 'On' : 'Off'}
              </span>
            </button>
          </div>

          {/* Camera Controls Info */}
          <div className="pt-4 border-t border-white/10">
            <h4 className="text-white/90 font-medium mb-2">Controls</h4>
            <div className="space-y-1 text-sm text-white/70">
              <p>• Click & drag to rotate</p>
              <p>• Scroll to zoom</p>
              <p>• Click buildings for info</p>
              <p>• ESC to close panels</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;

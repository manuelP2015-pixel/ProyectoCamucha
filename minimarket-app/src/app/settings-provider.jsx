import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSettings, updateSettings as updateSettingsSvc } from '../services/settings-service';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getSettings());

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const updateSettings = (patch) => {
    const next = updateSettingsSvc(patch);
    setSettings(next);
    return next;
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);


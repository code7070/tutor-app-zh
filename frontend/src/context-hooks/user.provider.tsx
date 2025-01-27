"use client";

import useCountry, { ICountryContext } from "./useCountry";
import React, { createContext, useContext, ReactNode } from "react";

export interface UserAppContextType {
  country: ICountryContext;
}

const UserAppContext = createContext<UserAppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const UserAppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const countryData = useCountry();

  const value = {
    country: countryData,
  };

  return (
    <UserAppContext.Provider value={value}>{children}</UserAppContext.Provider>
  );
};

export const useUserAppContext = () => {
  const context = useContext(UserAppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

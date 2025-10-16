// context to handle scroll to top on tab press
import React, { createContext, ReactNode, useContext, useRef } from "react";

interface ScrollContextType {
  scrollToTopRef: React.RefObject<{
    home?: () => void;
    products?: () => void;
  }>;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  const scrollToTopRef = useRef<{
    home?: () => void;
    products?: () => void;
  }>({});

  return (
    <ScrollContext.Provider value={{ scrollToTopRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

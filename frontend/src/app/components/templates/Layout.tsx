import { GlobalStateProvider } from '@/context/GlobalStateProvider';
import React, { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="min-h-screen flex w-full">
            <GlobalStateProvider>
                {children}
            </GlobalStateProvider>
        </div>;
};

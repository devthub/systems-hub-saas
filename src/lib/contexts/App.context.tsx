'use client';

import { ToastProps, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { createContext, ReactNode, useContext } from 'react';

type AppWrapperProviderProps = {
  children: ReactNode;
};

type AppContextProps = {
  showToast: ({ ...props }: ToastProps) => void;
  textColor: string;
  onOpen: () => void;
  contentBackground: string;
};

const AppContext = createContext<AppContextProps>({
  showToast() {},
  textColor: 'gray.500',
  onOpen() {},
  contentBackground: '#F7FAFC',
});

export function useAppContext() {
  return useContext(AppContext);
}

export const AppWrapperProvider = ({ children }: AppWrapperProviderProps) => {
  const toast = useToast();
  const textColor = useColorModeValue('gray.500', 'gray.400');
  const { onOpen } = useDisclosure();

  const showToast = ({ ...props }: ToastProps) => {
    toast({
      duration: 5000,
      isClosable: true,
      position: 'top-right',
      variant: 'left-accent',
      ...props,
    });
  };

  return (
    <AppContext.Provider
      value={{
        contentBackground: '#F7FAFC',
        onOpen,
        showToast,
        textColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

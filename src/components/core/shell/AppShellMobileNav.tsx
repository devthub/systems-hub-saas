'use client';

import { Button, Flex, FlexProps, HStack, IconButton, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { FiBell, FiMenu, FiShoppingCart } from 'react-icons/fi';

import { useAppContext } from '@/lib/contexts/App.context';
import LoggedInUserDropDown from '../nav/LoggedInUserDropDown';
import ThemeToggle from '../theme/ThemeToggle';

import type { Session } from 'next-auth';

interface MobileProps extends FlexProps {
  session: Session | null;
  expandSidebar?: boolean;
  onOpen: () => void;
  businessName?: string;
}

const AppShellMobileNav = ({ session, expandSidebar, businessName, onOpen, ...rest }: MobileProps) => {
  // const { data: session } = useSession();
  const { onOpen: onOpenCart } = useAppContext();

  const mobileNavDefaultBg = useBreakpointValue({
    base: '#0F2787',
    md: 'white',
  });

  const mobileNavBg = useColorModeValue(mobileNavDefaultBg, 'gray.900');

  const mobileNavBorderBColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex
      as={'nav'}
      transition=".5s ease"
      ml={{ base: 0, md: expandSidebar ? 60 : 20 }}
      px={4}
      height="16"
      alignItems="center"
      bg={mobileNavBg}
      borderBottomWidth="1px"
      borderBottomColor={mobileNavBorderBColor}
      justifyContent={{ base: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        color={{ base: 'white', md: 'gray.600' }}
        icon={<FiMenu />}
      />

      <Button variant={'ghost'} size={{ base: 'xs', md: 'lg' }} color={{ base: 'gray.100', md: 'gray.600' }}>
        {businessName}
      </Button>

      <HStack spacing={1} mr={{ base: 0, md: 8 }}>
        <IconButton
          size="sm"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
          color={{ base: 'gray.100', md: 'gray.600' }}
        />

        <IconButton
          size="sm"
          variant="ghost"
          aria-label="open menu"
          icon={<FiShoppingCart />}
          color={{ base: 'gray.100', md: 'gray.600' }}
          onClick={onOpenCart}
        />

        <ThemeToggle aria-label={'theme toggler'} color={{ base: 'gray.100', md: 'gray.600' }} />

        <LoggedInUserDropDown dontPush={false} session={session} />
      </HStack>
    </Flex>
  );
};

export default AppShellMobileNav;

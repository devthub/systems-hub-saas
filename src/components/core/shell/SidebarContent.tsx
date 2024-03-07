'use client';

import { Box, BoxProps, CloseButton, Flex, IconButton, Image, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

import { ISidebarLinkItem } from './AppShell';
import SidebarNavLink from './SidebarNavLink';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  linkItems: ISidebarLinkItem[];

  expandSidebar?: boolean;
  setExpandSidebar?: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}

const SidebarContent = ({ expandSidebar, setExpandSidebar, linkItems, onClose, ...rest }: SidebarProps) => {
  const sidebarBgColor = useColorModeValue('gray.200', 'gray.700');

  const borderRColor = useColorModeValue('gray.200', 'gray.700');

  const backgroundColor = useColorModeValue('#0F2787', 'gray.800');

  return (
    <Box
      transition=".5s ease"
      bg={sidebarBgColor}
      borderRight="1px"
      borderRightColor={borderRColor}
      w={{ base: 'full', md: expandSidebar ? 60 : 20 }}
      pos="fixed"
      h="full"
      // overflowX={'hidden'}
      {...rest}
    >
      <Box bg={backgroundColor}>
        <Flex
          h="16"
          alignItems="center"
          p={{ base: 4, md: 1 }}
          justifyContent={expandSidebar ? 'center' : 'space-between'}
          mb={4}
          transition={'ease'}
        >
          <NextLink href={'/'} passHref legacyBehavior>
            <Image
              style={{ transition: 'height 0.5s' }}
              src="/assets/img/systems-hub-logo-white.png"
              // width={'full'}
              height={expandSidebar ? 'full' : '6'}
              alt="logo"
              _hover={{
                cursor: 'pointer',
              }}
            />
          </NextLink>

          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            color={{ base: 'white', md: 'gray.600' }}
            onClick={onClose}
          />
        </Flex>
      </Box>

      {linkItems.map((link) => (
        <SidebarNavLink
          expanded={expandSidebar}
          key={link.name}
          mr={4}
          to={link.to || '#'}
          activeProps={{ fontWeight: 'bold' }}
          icon={link.icon}
        >
          {link.name}
        </SidebarNavLink>
      ))}

      <IconButton
        position="absolute"
        fontSize={'xl'}
        bottom={0}
        right={0}
        left={0}
        aria-label="expand sidebar"
        onClick={setExpandSidebar?.toggle}
        colorScheme="green"
        variant={'ghost'}
        icon={expandSidebar ? <MdArrowLeft /> : <MdArrowRight />}
      />
    </Box>
  );
};

export default SidebarContent;

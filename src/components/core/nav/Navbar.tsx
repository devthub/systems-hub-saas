'use client';

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import NextLink from 'next/link';

import DesktopNav from './DesktopNav';
import LoggedInUserDropDown from './LoggedInUserDropDown';
import MobileNav from './MobileNav';

export interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
}

export const NAV_ITEMS: Array<INavItem> = [
  // {
  //   label: 'Menu 1',
  //   children: [
  //     {
  //       label: 'Menu 1 Child 1',
  //       subLabel: 'Child 1 Menu Sub-label',
  //       href: '#',
  //     },
  //     {
  //       label: 'Menu 1 Child 2',
  //       subLabel: 'Child 2 Menu Sub-label',
  //       href: '#',
  //     },
  //   ],
  // },
  // {
  //   label: 'Menu 2',
  //   children: [
  //     {
  //       label: 'Menu 2 Child 1',
  //       subLabel: 'Menu 2 Child 1 Sub-label',
  //       href: '#',
  //     },
  //     {
  //       label: 'Menu 2 Child 2',
  //       subLabel: 'Menu 2 Child 2 Sub-label',
  //       href: '#',
  //     },
  //   ],
  // },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Affiliates',
    href: '/affiliates',
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const { data: session, status } = useSession();

  return (
    <Box as="nav">
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1, md: 'auto' }} ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">
          <Center>
            <NextLink href={'/'} passHref legacyBehavior>
              <Image
                src="/assets/img/systems-hub-logo.png"
                width={100}
                height={100}
                // sizes={'100vw'}
                style={{ width: 'auto', height: 'auto' }}
                alt="logo"
              />
            </NextLink>
          </Center>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={2}>
          {(status === 'unauthenticated' && (
            <>
              <Button
                // h={12}
                px={6}
                bgGradient="linear(to-br, #80bC00, #98D9F1)"
                color="white"
                _hover={{ bgGradient: 'linear(to-br, #80bC00, #80bC00)' }}
                variant="solid"
                size="sm"
                rounded="md"
                // fontWeight="bold"
                mb={{ base: 2, sm: 0 }}
                as={NextLink}
                href="/get-started"
              >
                Get Started
              </Button>

              <Button
                as={NextLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontWeight={600}
                color={'white'}
                bg={'#80bC00'}
                href={'/signin'}
                _hover={{
                  bg: '#99c932',
                }}
                size={'sm'}
              >
                Sign In
              </Button>
            </>
          )) || (
            <Skeleton isLoaded={status !== 'loading'}>
              <LoggedInUserDropDown session={session} dontPush={true} />
            </Skeleton>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

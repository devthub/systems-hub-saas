'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { FiChevronDown, FiCreditCard, FiLayout, FiLogOut, FiSettings, FiShoppingCart, FiUsers } from 'react-icons/fi';

import { AGENCY_LINK } from '../shell/AppShell';

import type { Session } from 'next-auth';

interface ILoggedInUserDropDownProps {
  session: Session | null;
  dontPush: boolean;
}

function LoggedInUserDropDown({ session, dontPush }: ILoggedInUserDropDownProps) {
  const menuListBg = useColorModeValue('white', 'gray.900');

  const menuListBorderColor = useColorModeValue('gray.200', 'gray.700');

  const { push } = useRouter();

  const asPath = usePathname();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: `/auth/signin?callbackUrl=${asPath}`,
    });

    if (!dontPush) push(data.url);
  };

  const userAdminMenuDropdown = useMemo(
    () => [
      {
        title: 'Assigned Accounts',
        linkTo: '/assigned-accounts',
        icon: <FiUsers />,
      },
      { title: 'Projects', linkTo: '/projects', icon: <FiSettings /> },
    ],
    []
  );

  const superAdminMenuDropdown = useMemo(
    () => [
      { title: 'Accounts', linkTo: AGENCY_LINK.accounts, icon: <FiUsers /> },
      { title: 'Team', linkTo: AGENCY_LINK.teams, icon: <FiUsers /> },
      {
        title: 'Products',
        linkTo: AGENCY_LINK.products,
        icon: <FiShoppingCart />,
      },
      { title: 'Billing', linkTo: AGENCY_LINK.billing, icon: <FiCreditCard /> },
    ],
    []
  );

  const avatarProps = session?.user?.imgUrl ? { src: session?.user?.imgUrl } : { name: session?.user?.username };

  const loggedInUserIsASuperAdmin = session?.user?.role === 'super-admin';

  const loggedInUserIsAnAdmin = session?.user?.role === 'admin';

  const menu = loggedInUserIsASuperAdmin ? superAdminMenuDropdown : loggedInUserIsAnAdmin ? userAdminMenuDropdown : [];

  if (!session) {
    return (
      <NextLink href={'/auth/signin'} legacyBehavior passHref>
        <Button as="a" colorScheme={'blue'}>
          Signin
        </Button>
      </NextLink>
    );
  }

  return (
    <Flex alignItems={'center'} mr={4}>
      <Menu>
        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
          <HStack>
            <Avatar size={'sm'} {...avatarProps} name={session?.user?.username} />
            <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
              <Text fontSize="sm">{session?.user?.username}</Text>
              <Text fontSize="xs" color="gray.600">
                {session?.user?.role}
              </Text>
            </VStack>
            <Box display={{ base: 'none', md: 'flex' }}>
              <FiChevronDown />
            </Box>
          </HStack>
        </MenuButton>

        <MenuList bg={menuListBg} borderColor={menuListBorderColor} zIndex={2}>
          <MenuItem>Welcome back, {session?.user?.username}</MenuItem>
          <MenuDivider />
          {loggedInUserIsASuperAdmin && (
            <NextLink href={AGENCY_LINK.dashboard} passHref legacyBehavior>
              <MenuItem icon={<FiLayout />} as="a">
                Admin Dashboard
              </MenuItem>
            </NextLink>
          )}
          <NextLink href="/dashboard" passHref legacyBehavior>
            <MenuItem icon={<FiLayout />} as="a">
              Dashboard
            </MenuItem>
          </NextLink>

          {menu?.map((item, indx) => (
            <NextLink key={`${indx}-${item.linkTo}`} href={item.linkTo} passHref legacyBehavior>
              <MenuItem icon={item.icon} as="a">
                {item.title}
              </MenuItem>
            </NextLink>
          ))}

          <MenuDivider />
          <MenuItem icon={<FiLogOut />} onClick={handleSignOut}>
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default LoggedInUserDropDown;

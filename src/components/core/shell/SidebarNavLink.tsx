'use client';

import {
  Link as ChakraLink,
  Flex,
  Icon,
  LinkProps,
  Text,
  Tooltip,
  // useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';

interface NavLinkProps extends LinkProps {
  children?: string | React.ReactNode;
  expanded?: boolean;
  to: string;
  activeProps?: LinkProps;
  _hover?: LinkProps;
  icon: IconType;
}

function SidebarNavLink({
  to,
  icon,
  activeProps,
  children,
  expanded,
  // _hover,
  ...props
}: NavLinkProps) {
  const asPath = usePathname();

  const isActive = asPath === to;

  const color = useColorModeValue('white', 'selected');
  // const menuLabel = useBreakpointValue({ base: children, md: null });

  if (isActive) {
    return (
      <ChakraLink
        as={NextLink}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        fontWeight="bold"
        {...props}
        {...activeProps}
        _hover={{ color: 'selected' }}
        color={color}
      >
        <Tooltip label={children} aria-label={`for ${children}`} placement="right" hasArrow>
          <Flex
            direction={{ base: 'row', md: expanded ? 'row' : 'column' }}
            alignItems="center"
            justifyContent={{
              base: 'flex-start',
              md: expanded ? 'flex-start' : 'center',
            }}
            p="2"
            mx="2"
            mb="-5"
            borderRadius="md"
            role="group"
            cursor="pointer"
            _hover={{ bg: 'blue.400', color: 'white' }}
            bg="blue.600"
          >
            {icon && (
              <Icon
                mr={{ base: 4, md: expanded ? 4 : 0 }}
                fontSize={20}
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
                transition="font-size 0.3s ease-in-out"
              />
            )}
            {/* {expanded ? children : menuLabel} */}
            <Text
              fontSize={{ base: 'inherit', md: expanded ? 'sm' : '8px' }}
              fontWeight="extrabold"
              transition="font-size 0.3s ease-in-out"
            >
              {children}
            </Text>
          </Flex>
        </Tooltip>
      </ChakraLink>
    );
  }

  return (
    <ChakraLink as={NextLink} {...props} _hover={{ color: 'selected' }}>
      <Tooltip label={children} aria-label={`for ${children}`} placement="right" hasArrow>
        <Flex
          direction={{ base: 'row', md: expanded ? 'row' : 'column' }}
          alignItems="center"
          justifyContent={{
            base: 'flex-start',
            md: expanded ? 'flex-start' : 'center',
          }}
          p="2"
          mx="2"
          mb="-5"
          borderRadius="md"
          role="group"
          cursor="pointer"
          _hover={{ bg: 'blue.400', color: 'white' }}
        >
          {icon && (
            <Icon
              mr={{ base: 4, md: expanded ? 4 : 0 }}
              fontSize={20}
              _groupHover={{
                color: 'white',
              }}
              as={icon}
              transition="font-size 0.3s ease-in-out"
            />
          )}
          {/* {expanded ? children : menuLabel} */}

          <Text fontSize={{ base: 'inherit', md: expanded ? 'sm' : '8px' }} transition="font-size 0.3s ease-in-out">
            {children}
          </Text>
        </Flex>
      </Tooltip>
    </ChakraLink>
  );
}

export default SidebarNavLink;

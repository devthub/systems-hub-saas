'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';

function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-br, #80bC00, #98D9F1)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you&apos;re looking for does not seem to exist
      </Text>

      <Link href={'/'}>
        <Button
          h={12}
          px={6}
          bgGradient="linear(to-br, #80bC00, #98D9F1)"
          color="white"
          _hover={{ bgGradient: 'linear(to-br, #80bC00, #80bC00)' }}
          variant="solid"
          size="lg"
          rounded="md"
          fontWeight="bold"
          mb={{ base: 2, sm: 0 }}
          // colorScheme="teal"
          // bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          // color="white"
          // variant="solid"
        >
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}

export default NotFound;

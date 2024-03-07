'use client';

import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface IPageForbiddenProps {
  message?: string | undefined | null;
  linkToHome?: string | undefined | null | boolean;
}
export default function PageForbidden({
  message = "You're not allowed on this page.",
  linkToHome,
}: IPageForbiddenProps) {
  const router = useRouter();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, orange.400, orange.600)"
        backgroundClip="text"
      >
        403
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Forbidden Page
      </Text>
      <Text color={'gray.500'} mb={6}>
        {message}
      </Text>

      <Button
        colorScheme="orange"
        bgGradient="linear(to-r, orange.400, orange.500, orange.600)"
        color="white"
        variant="solid"
        type="button"
        aria-label="back to previous page"
        onClick={() => {
          if (linkToHome) {
            router.push(linkToHome as string);
          } else router.back();
        }}
      >
        {linkToHome ? 'Go to Home' : 'Go Back'}
      </Button>
    </Box>
  );
}

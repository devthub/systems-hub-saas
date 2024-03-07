'use client';

import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

interface ISomethingWentWrongProps {
  message?: string;
}
function SomethingWentWrong({
  message = 'Something went wrong. This is embarrassing. Please contact admin.',
}: ISomethingWentWrongProps) {
  return (
    <Flex align="center" justify="center" py={10} px={6} h="100vh" direction="column">
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={'red.500'}
          rounded={'50px'}
          w={'55px'}
          h={'55px'}
          textAlign="center"
        >
          <CloseIcon boxSize={'20px'} color={'white'} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Oopsie!!!
      </Heading>
      <Text color={'gray.500'}>{message}</Text>
    </Flex>
  );
}

export default SomethingWentWrong;

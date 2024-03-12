'use client';

import { Box, Button, chakra, Container, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { Fragment } from 'react';

// Here we have used react-icons package for the icons
const features = [
  {
    title: 'Unlock Your Full Potential',
    detail:
      'We believe that every business possesses untapped potential. Our comprehensive solutions help you unlock and harness that potential to take your business to new heights.',
    icon: (
      <svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
      </svg>
    ),
  },
  {
    title: 'Robust Knowledge Bank',
    detail:
      'Our state-of-the-art Knowledge Bank is designed to organize and store your invaluable information securely. Access critical data instantly, enabling your teams to make informed decisions promptly.',
    icon: (
      <svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
        <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
        <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
        <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Collaboration',
    detail: `Foster a culture of collaboration within your organization with our platform's integrated features. Share knowledge effortlessly and stimulate innovation among your teams.`,
    icon: (
      <svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
          clipRule="evenodd"
        />
        <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
      </svg>
    ),
  },
  {
    title: 'Customized Solutions',
    detail:
      'We understand that every business is unique. Our team works closely with you to tailor our solutions to your specific requirements, ensuring maximum efficiency and impact.',
    icon: (
      <svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
          clipRule="evenodd"
        />
        <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
        <path
          fillRule="evenodd"
          d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    detail:
      'Our commitment to your success extends beyond implementation. Our dedicated support team is always ready to assist you, ensuring a smooth and rewarding experience.',
    icon: (
      <svg aria-hidden="true" role="img" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];
const HeroSection = () => {
  return (
    <Fragment>
      <Container maxW="8xl" px={{ base: 6, md: 10 }} py={14}>
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Stack direction="column" spacing={10} justifyContent="center">
            <chakra.h1 fontSize="5xl" lineHeight={1} fontWeight="bold" textAlign="left" color={'#002F87'}>
              Empowering Businesses through
              <chakra.span bgGradient="linear(to-br, #80bC00, #98D9F1)" bgClip="text">
                {' '}
                <br />
                Efficient Information Management{' '}
              </chakra.span>{' '}
            </chakra.h1>
            <Text
              color={useColorModeValue('gray.500', 'gray.400')}
              fontSize="lg"
              textAlign="left"
              fontWeight="400"
              maxW="700px"
            >
              At Systems Hub, our passion lies in enabling businesses to reach their true potential by revolutionizing
              information management. We understand the vital role that knowledge plays in the growth and success of any
              enterprise. That&apos;s why we have built a powerful Knowledge Bank that serves as the cornerstone of
              seamless collaboration and information sharing.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 5, md: 10 }} flexWrap="wrap">
              {features.map((feature, index) => (
                <Stack key={index} direction={{ base: 'row', md: 'column' }} spacing={2}>
                  <Flex
                    p={3}
                    maxH="52px"
                    w="max-content"
                    color="white"
                    bgGradient="linear(to-br, #80bC00, #98D9F1)"
                    rounded="md"
                  >
                    {feature.icon}
                  </Flex>
                  <Stack direction="column" spacing={2}>
                    <Text fontSize="md" fontWeight="500">
                      {feature.title}
                    </Text>
                    <Text fontSize="sm" color="gray.400" maxW={{ base: '100%', md: '200px' }}>
                      {feature.detail}
                    </Text>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: 0, sm: 2 }} flexWrap="wrap">
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
                as={NextLink}
                href="/get-started"
              >
                <chakra.span> Get Started </chakra.span>
              </Button>
              {/* <Flex
                border="1px solid"
                borderColor="gray.700"
                justify="center"
                p={3}
                px={4}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                fontWeight="bold"
                alignItems="center"
                as={Link}
              >
                <Icon as={FaGithub} h={4} w={4} />
                <chakra.span ml={1}> Github</chakra.span>
              </Flex> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Box overflow="hidden">
        <svg
          fill={useColorModeValue('#f7fafc', '#171923')}
          width="150%"
          height="56px"
          transform="scaleX(-1)"
          filter="drop-shadow(10px 5px 5px rgba(0, 0, 0, 0.05))"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={`M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 
            250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 
            3V0H0v27.35a600.21 600.21 0 00321.39 29.09z`}
          ></path>
        </svg>
      </Box>
    </Fragment>
  );
};

export default HeroSection;

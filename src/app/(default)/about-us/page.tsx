'use client';

import { Container, Heading, Stack, Text } from '@chakra-ui/react';

import { useAppContext } from '@/lib/contexts/App.context';

function AboutUsPage() {
  const { textColor } = useAppContext();

  return (
    <Container maxW={'7xl'}>
      <Stack align={'center'} spacing={8} py={18} direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={5}>
          <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: '30%',
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'green.400',
                zIndex: -1,
              }}
            >
              About Us
            </Text>
            <br />
            <Text as={'span'} color={'blue.400'}>
              Welcome to Systems Hub!
            </Text>
          </Heading>
          <Text color={textColor}>
            At Systems Hub, we are dedicated to creating a comprehensive knowledge bank of business systems. Our primary
            goal is to develop a platform that efficiently manages and shares valuable information with all users. We
            understand that in today&apos;s fast-paced business environment, access to accurate and up-to-date
            information is crucial for success.
          </Text>
          <Text color={textColor}>
            With years of industry experience, our team of experts is committed to building an innovative solution that
            meets the evolving needs of businesses across various sectors. We believe that by centralizing knowledge and
            streamlining information flow, organizations can enhance collaboration, make informed decisions, and drive
            overall productivity.
          </Text>
          <Text color={textColor}>
            Our platform utilizes cutting-edge technologies to provide a seamless user experience. Through intuitive
            interfaces and robust functionalities, we empower businesses to effectively capture, organise, and retrieve
            critical information. Our system is designed to accommodate the specific requirements of each organization,
            allowing for customization and scalability.
          </Text>
          <Text color={textColor}>
            We prioritize the security and confidentiality of our users&apos; information. Our rigorous data protection
            measures ensure that sensitive data remains safe from unauthorized access or breaches. We adhere to industry
            best practices and compliance standards to uphold the integrity and privacy of the information stored within
            our system.
          </Text>
          <Text color={textColor}>
            At Systems Hub, we believe in fostering strong partnerships with our clients. We work closely with
            businesses of all sizes, from startups to enterprises, to understand their unique challenges and
            requirements. Our dedicated support team is always ready to provide prompt assistance, ensuring a smooth
            implementation process and ongoing support.
          </Text>
          <Text color={textColor}>
            We are passionate about helping businesses unlock their full potential through efficient information
            management. By providing a robust knowledge bank that promotes seamless collaboration and information
            sharing, we aim to contribute to the growth and success of our clients.
          </Text>
          <Text color={textColor}>
            Thank you for visiting our About Us page. We look forward to the opportunity to work with you and assist you
            in achieving your business objectives.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AboutUsPage;

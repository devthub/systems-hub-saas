'use client';

import { Container, Heading, ListItem, OrderedList, Stack, Text } from '@chakra-ui/react';

import { useAppContext } from '@/lib/contexts/App.context';

function AffiliatesPage() {
  const { textColor } = useAppContext();

  return (
    <Container maxW={'7xl'}>
      <Stack align={'center'} spacing={8} py={18} direction={{ base: 'column', md: 'row' }}>
        <Stack flex={1} spacing={{ base: 5, md: 8 }}>
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
              Affiliates
            </Text>
            <br />
            <Text as={'span'} color={'blue.400'}>
              Become an Affiliate!
            </Text>
          </Heading>
          <Text color={textColor}>
            At Systems Hub, we value collaboration and partnerships. We believe in working together with like-minded
            organizations to create mutually beneficial opportunities and expand our reach. Our Affiliate program offers
            a unique chance to join forces with us and tap into our expertise in knowledge and information management
            solutions.
          </Text>
          <Text color={textColor}>Why become an Affiliate?</Text>
          <OrderedList spacing={3} textColor={textColor}>
            <ListItem>
              Earn Competitive Commissions: As an Affiliate, you have the opportunity to earn generous commissions for
              each successful referral or sale made through your unique referral link. We value the contributions of our
              Affiliates and provide a rewarding commission structure.
            </ListItem>
            <ListItem>
              Access to Cutting-Edge Solutions: By partnering with us, you gain access to our innovative knowledge and
              information management solutions. You can leverage our platform to enhance your own offerings and provide
              added value to your clients.
            </ListItem>
            <ListItem>
              Expand Your Network: Collaborating with [Company Name] opens doors to new networking opportunities.
              Connect with other Affiliates, industry experts, and potential clients to build meaningful relationships
              and broaden your professional network.
            </ListItem>
            <ListItem>
              Marketing Support: We understand the importance of effective marketing. As an Affiliate, you&apos;ll
              receive comprehensive marketing support, including promotional materials, resources, and guidance to help
              you maximize your referral potential.
            </ListItem>
            <ListItem>
              Dedicated Affiliate Manager: We provide a dedicated Affiliate Manager who will be your point of contact,
              assisting you with any queries, offering guidance, and ensuring a smooth collaboration.
            </ListItem>
          </OrderedList>
        </Stack>
      </Stack>
    </Container>
  );
}

export default AffiliatesPage;

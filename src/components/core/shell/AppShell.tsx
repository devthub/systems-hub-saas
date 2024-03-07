'use client';

import { Box, Drawer, DrawerContent, useBoolean, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import {
  MdAddCard,
  MdAddChart,
  MdAddShoppingCart,
  MdAttachMoney,
  MdCategory,
  MdFolder,
  MdGroupAdd,
  MdGroups2,
  MdHome,
  MdInterests,
  MdOutlineDeveloperBoard,
  MdOutlinePermMedia,
  MdOutlineSnippetFolder,
  MdSettings,
  MdSpaceDashboard,
} from 'react-icons/md';

import { useAppContext } from '@/lib/contexts/App.context';
import PageForbidden from '../errors/PageForbidden';
import PageLoader from '../loaders/PageLoader';
import AppShellMobileNav from './AppShellMobileNav';
import SidebarContent from './SidebarContent';

export const AGENCY_LINK = {
  dashboard: '/agency/dashboard',
  categories: '/agency/categories',
  systems: '/agency/systems',
  blogs: '/agency/blogs',
  media: '/agency/media',
  teams: '/agency/teams',
  products: '/agency/products',
  accounts: '/agency/accounts',
  charts: '/agency/charts',
  projects: '/agency/projects',
  orders: '/agency/orders',
  billing: '/agency/billing',
  reports: '/agency/reports',
  settings: '/agency/settings',
};

export type ISidebarLinkItem = {
  name: string;
  icon: IconType;
  to?: string;
};

export const AgencyLinkItems: Array<ISidebarLinkItem> = [
  { name: 'Dashboard', icon: MdSpaceDashboard, to: AGENCY_LINK.dashboard },
  {
    name: 'Accounts',
    icon: MdGroups2,
    to: AGENCY_LINK.accounts,
  },
  { name: 'Categories', icon: MdCategory, to: AGENCY_LINK.categories },
  {
    name: 'Charts',
    icon: MdOutlineDeveloperBoard,
    to: AGENCY_LINK.charts,
  },
  { name: 'Systems', icon: MdInterests, to: AGENCY_LINK.systems },
  { name: 'Blogs', icon: MdInterests, to: AGENCY_LINK.blogs },
  { name: 'Media', icon: MdOutlinePermMedia, to: AGENCY_LINK.media },
  {
    name: 'Projects',
    icon: MdOutlineSnippetFolder,
    to: AGENCY_LINK.projects,
  },
  { name: 'Teams', icon: MdGroupAdd, to: AGENCY_LINK.teams },
  { name: 'Products', icon: MdAddShoppingCart, to: AGENCY_LINK.products },
  { name: 'Orders', icon: MdAttachMoney, to: AGENCY_LINK.orders },
  { name: 'Billing', icon: MdAddCard, to: AGENCY_LINK.billing },
  { name: 'Reports', icon: MdAddChart, to: AGENCY_LINK.reports },
  { name: 'Settings', icon: MdSettings, to: AGENCY_LINK.settings },
];

const AccountLinkItems: Array<ISidebarLinkItem> = [
  { name: 'Home', icon: MdHome, to: '/' },
  { name: 'Dashboard', icon: MdSpaceDashboard, to: '/dashboard' },
  { name: 'Media', icon: MdOutlinePermMedia, to: '/media' },
  { name: 'Systems', icon: MdInterests, to: '/systems' },
  { name: 'Pages', icon: MdFolder, to: '/account-pages' },
  { name: 'Blogs', icon: MdFolder, to: '/blogs' },
  { name: 'Categories', icon: MdCategory, to: '/categories' },
  { name: 'Charts', icon: MdAddChart, to: '/charts' },
  { name: 'Store', icon: MdAddShoppingCart, to: '/store' },
  { name: 'Orders', icon: MdAttachMoney, to: '/orders' },
  { name: 'Projects', icon: MdOutlineSnippetFolder, to: '/projects' },
  { name: 'Reports', icon: MdAddChart, to: '/reports' },
  { name: 'Teams', icon: MdGroupAdd, to: '/teams' },
  { name: 'Settings', icon: MdSettings, to: '/settings' },
];

const getAccountsLinkItems = (linkItems: ISidebarLinkItem[] | undefined, accountLocationSlug: string) => {
  if (!linkItems) {
    return []; // Handle the case where linkItems is undefined
  }

  const newLinkItems: ISidebarLinkItem[] = linkItems?.map((li: ISidebarLinkItem) => {
    return {
      ...li,
      to: li.to?.replace('/', `/${accountLocationSlug}/`) || '#',
    };
  });

  return newLinkItems;
};

type AppShellProps = {
  isAgency?: boolean;
  children: ReactNode;
  expandSidebarDefault?: boolean;
  linkItems?: Array<ISidebarLinkItem>;
  businessName?: string;
  accountLocationSlug: string;
};
function AppShell({
  isAgency = true,
  expandSidebarDefault = false,
  children,
  businessName = 'AGENCY',
  accountLocationSlug,
}: AppShellProps) {
  const { contentBackground } = useAppContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [expandSidebar, setExpandSidebar] = useBoolean(expandSidebarDefault);

  const appShellBg = useColorModeValue(contentBackground, 'gray.900');

  const callbackUrl = usePathname();

  const linkItems: ISidebarLinkItem[] = isAgency
    ? AgencyLinkItems
    : getAccountsLinkItems(AccountLinkItems, accountLocationSlug);

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signOut({
        callbackUrl: `/auth/signin?callbackUrl=${callbackUrl}`,
        redirect: true,
      });
    },
  });

  if (status === 'loading') {
    return <PageLoader loadingText="Checking credentials..." />;
  }

  if (status === 'authenticated' && session && session?.user && session?.user.role === 'super-admin') {
    return (
      <Box minH="100vh" bg={appShellBg}>
        <SidebarContent
          expandSidebar={expandSidebar}
          setExpandSidebar={setExpandSidebar}
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
          linkItems={linkItems}
        />

        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="xs"
        >
          <DrawerContent>
            <SidebarContent linkItems={linkItems} onClose={onClose} />
          </DrawerContent>
        </Drawer>

        {/* MobileNav */}
        <AppShellMobileNav
          session={session || null}
          expandSidebar={expandSidebar}
          businessName={businessName}
          onOpen={onOpen}
        />

        {/* Content */}
        <Box as="main" ml={{ base: 0, md: expandSidebar ? 60 : 20 }} p="4" transition=".5s ease">
          {children}
        </Box>
      </Box>
    );
  } else return <PageForbidden linkToHome={'/'} />;
}

export default AppShell;

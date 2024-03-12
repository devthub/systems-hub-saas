import { ReactNode } from 'react';

import Navbar from '@/components/core/nav/Navbar';

function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}

export default DefaultLayout;

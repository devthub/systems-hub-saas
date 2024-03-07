'use client';

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import PageLoader from '@/components/core/loaders/PageLoader';
import { AGENCY_LINK } from '@/components/core/shell/AppShell';
import SignInForm from './SignInForm';

function SignIn() {
  const searchParams = useSearchParams();

  const router = useRouter();

  const { data: session, status } = useSession();

  const callbackUrl = searchParams?.get('callbackUrl');

  if (status === 'loading') return <PageLoader loadingText="Checking credentials..." />;
  else if (session) {
    const userIsSuperAdmin = session?.user?.role === 'super-admin';

    setTimeout(() => {
      if (callbackUrl) {
        return router.push(`${callbackUrl}`);
      } else router.push(userIsSuperAdmin ? AGENCY_LINK.dashboard : 'dashboard');
    }, 100);

    return <PageLoader loadingText="Redirecting..." />;
  }

  return <SignInForm />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={<PageLoader loadingText="Loading signin form..." />}>
      <SignIn />
    </Suspense>
  );
}

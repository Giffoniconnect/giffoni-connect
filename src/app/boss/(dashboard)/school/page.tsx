'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BossSchoolPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the new students management page by default
    router.replace('/boss/school/students');
  }, [router]);

  // Render nothing or a loading indicator while redirecting
  return null;
}

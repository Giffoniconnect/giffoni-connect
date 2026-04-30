'use client';

import React, { useMemo, type ReactNode } from 'react';
import { FirebaseProvider } from '@/firebase/provider';

// Direct imports to bypass potential barrel file / circular dependency issues
import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * A self-contained, isolated Firebase initialization function.
 * It avoids importing from the barrel file ('@/firebase') to prevent
 * module resolution issues that could lead to using a stale or incorrect
 * Firebase app instance.
 */
function initializeFirebaseOnce() {
  // If an app is already initialized, return its services.
  // This is the standard singleton pattern for Firebase on the client.
  if (getApps().length) {
    const app = getApp();
    return {
      firebaseApp: app,
      auth: getAuth(app),
      firestore: getFirestore(app)
    };
  }
  
  // If no app is initialized, initialize one with the explicit configuration.
  const firebaseApp = initializeApp(firebaseConfig);
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // useMemo ensures that Firebase is initialized only once per client session.
  const firebaseServices = useMemo(() => {
    return initializeFirebaseOnce();
  }, []);

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}

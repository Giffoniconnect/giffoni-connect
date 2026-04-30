'use server';

import { revalidatePath } from 'next/cache';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Helper to initialize Firebase on the server-side, ensuring singleton pattern.
function getFirebaseApp() {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

const firestore = getFirestore(getFirebaseApp());

export async function updateClientField(clientId: string, fieldData: Record<string, any>) {
    if (!clientId) {
        return { success: false, error: 'ID do cliente não fornecido.' };
    }

    try {
        const clientRef = doc(firestore, 'clients', clientId);
        
        await updateDoc(clientRef, fieldData);
        
        revalidatePath(`/boss/clients/${clientId}`);

        return { success: true };
    } catch (error: any) {
        console.error('Error updating client field:', error);
        return { success: false, error: error.message || 'Falha ao atualizar o campo no servidor.' };
    }
}

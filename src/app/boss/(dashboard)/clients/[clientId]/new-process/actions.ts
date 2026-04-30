
'use server';

import { revalidatePath } from 'next/cache';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { firebaseConfig } from '@/firebase/config';

// Helper to initialize Firebase on the server-side, ensuring singleton pattern.
function getFirebaseApp() {
  if (getApps().length) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}

const firestore = getFirestore(getFirebaseApp());

export async function createProcess(clientId: string, data: {
    clientName: string;
    opposingParty: string;
    caseNumber: string;
    district: string;
    state: string;
    court: string;
    responsibleJudge?: string;
}) {
    if (!clientId) {
        return { success: false, error: 'ID do cliente não fornecido.' };
    }

    try {
        const casesCollectionRef = collection(firestore, 'clients', clientId, 'cases');

        const newCaseData = {
            ...data,
            clientId,
            actionType: 'Não definido', // Default value
            status: 'Pendente',
            infoRequestStatus: 'none',
            proofRequestStatus: 'none',
            lastUpdate: new Date().toISOString(),
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(casesCollectionRef, newCaseData);
        
        // Now update the document to include its own ID
        await updateDoc(docRef, {
            id: docRef.id,
        });

        revalidatePath(`/boss/clients/${clientId}`);

        return { success: true, caseId: docRef.id };

    } catch (error: any) {
        console.error('Error creating case:', error);
        return { success: false, error: error.message || 'Falha ao criar o caso no servidor.' };
    }
}

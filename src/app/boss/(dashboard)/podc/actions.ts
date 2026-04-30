
'use server';

import { firebaseConfig } from "@/firebase/config";
import { SubFunction, Verification } from "@/lib/data";
import { collection, addDoc, serverTimestamp, doc, updateDoc, writeBatch, getFirestore } from "firebase/firestore";
import { initializeApp, getApp, getApps } from "firebase/app";

// Helper to initialize Firebase on the server-side, ensuring singleton pattern.
const getAppInstance = () => {
    if (!getApps().length) {
        return initializeApp(firebaseConfig);
    }
    return getApp();
};

const getFirestoreInstance = () => {
    return getFirestore(getAppInstance());
}


type NewHubData = {
    title: string;
    description: string;
    linkedRoute: string;
};

export async function createTestHub(hubData: NewHubData) {
    const firestore = getFirestoreInstance();
    const hubsRef = collection(firestore, 'quality_control_hubs');
    await addDoc(hubsRef, {
        ...hubData,
        createdAt: serverTimestamp()
    });
}

type NewControlData = {
    title: string;
    description: string;
    subVerifications: string;
};

type MainFunctionOmitId = {
    title: string;
    description: string;
    status: 'Pendente de Verificação';
    createdAt: any; // serverTimestamp
    subFunctions: SubFunction[];
}

export async function createTestSection(hubId: string, controlData: NewControlData) {
    const firestore = getFirestoreInstance();
    if (!firestore || !hubId) {
        throw new Error("Firestore or Hub ID is not available.");
    }
    const testPlanRef = collection(firestore, 'quality_control_hubs', hubId, 'test_plans');
    
    const { title, description, subVerifications } = controlData;

    const newSubFunctions: SubFunction[] = subVerifications.split('\n').filter(line => line.trim() !== '').map((line, index) => ({
        id: `new-sub-${Date.now()}-${index}`,
        title: line.trim(),
        description: `Verificação para: ${line.trim()}`,
        status: 'Pendente de Verificação',
        verifications: [{ id: `new-v-${Date.now()}-${index}`, text: 'Confirmar implementação e funcionamento.', status: 'Pendente de Verificação' }]
    }));
    
    if (newSubFunctions.length === 0) {
        newSubFunctions.push({
            id: `new-sub-${Date.now()}-0`,
            title: 'Verificação Padrão',
            description: 'Verificação geral para esta função.',
            status: 'Pendente de Verificação',
            verifications: [{ id: `new-v-${Date.now()}-0`, text: 'Confirmar implementação e funcionamento.', status: 'Pendente de Verificação' }]
        });
    }

    const newMainFunction: MainFunctionOmitId = {
        title: `🔧 Seção: ${title}`,
        description,
        status: 'Pendente de Verificação',
        createdAt: serverTimestamp(),
        subFunctions: newSubFunctions,
    };
    
    await addDoc(testPlanRef, newMainFunction);
}

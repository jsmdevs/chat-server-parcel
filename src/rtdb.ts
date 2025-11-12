import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get } from "firebase/database";

function parseFirebaseConfig(configString: string | undefined): any {
    if (!configString) {
        throw new Error('FIREBASE_CONFIG no está definida en las variables de entorno. Verifica tu .env');
        
    }
    try {
        return JSON.parse(configString);
    } catch (error) {
        throw new Error(`Error al parsear FIREBASE_CONFIG: ${(error as Error).message}`);
    }
}

const firebaseConfig = parseFirebaseConfig(process.env.FIREBASE_CONFIG);

// Tipado explícito para Firebase
type FirebaseConfigType = {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
};

const typedConfig = firebaseConfig as FirebaseConfigType;

const app = initializeApp(typedConfig);
const db = getDatabase(app);

export { db, ref, onValue, get };
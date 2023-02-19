import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCslWk06qlytWKhADGfIFO1rMiT_RN-mzY',
	authDomain: 'cic-chatbot-44b0e.firebaseapp.com',
	projectId: 'cic-chatbot-44b0e',
	storageBucket: 'cic-chatbot-44b0e.appspot.com',
	messagingSenderId: '146213972012',
	appId: '1:146213972012:web:d84419a6aad48077844989',
	measurementId: 'G-WLGBD6BSMQ',
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

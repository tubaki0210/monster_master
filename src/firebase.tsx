import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcrhry32fUCU2hWK_4XThIFDdINcpw_6A",
    authDomain: "monsters-a5142.firebaseapp.com",
    projectId: "monsters-a5142",
    storageBucket: "monsters-a5142.firebasestorage.app",
    messagingSenderId: "912926304866",
    appId: "1:912926304866:web:4613e1a1b18a24b4c0ff3b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db_fire = getFirestore(app)

  export default db_fire
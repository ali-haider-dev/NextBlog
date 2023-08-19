// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  set,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVUBP0VedDb_llABNgIOFmYCqkc2tns5I",
  authDomain: "saylani-hackathon-f66b2.firebaseapp.com",
  projectId: "saylani-hackathon-f66b2",
  storageBucket: "saylani-hackathon-f66b2.appspot.com",
  messagingSenderId: "193286485054",
  appId: "1:193286485054:web:6563ad620977b906d9cd6f",
  measurementId: "G-15Y786GZWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export const singUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const Signin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const StoreUserDetails = async (name, email, password, uid) => {
  return await setDoc(doc(db, "UsersDetail", uid), {
    name: name,
    email: email,
    password: password,
    userid: uid,
  });
};

export const RegisterBlog = async (title, content, id,user) => {
  const myCollection = collection(db, "Blogs"); // Creating a reference to your collection

  // Creating a new document with auto-generated ID and storing data in it
  const newDocRef = doc(myCollection);
  const newDocId = newDocRef.id;

  const myData = {
    title,
    content,
    userId: id,
    user,
    timestamp: serverTimestamp(),
    docId:newDocId
  };
  await setDoc(newDocRef, myData);
};
export const getCurrentUser = async (uid) => {
    const noteSnapshot = await getDoc(doc(db, 'UsersDetail', uid));
    if (noteSnapshot.exists()) {
     return  noteSnapshot.data();
      
    } else {
        console.log("Note doesn't exist");
        return null;
    }
 
};
export const getBlogs = async () => {
    const notesSnapshot = await getDocs(collection(db, "Blogs"),orderBy('timestamp'));
    const notesList = notesSnapshot.docs.map((doc) => doc.data());
    return notesList;
};

export const fetchUserBlogs = async(id) =>{
  const ordersCollection = collection(db, 'Blogs');

  const userOrdersQuery = query(ordersCollection,where('userId', '==', id));

  try {
    const querySnapshot = await getDocs(userOrdersQuery);
    const orders = querySnapshot.docs.map((doc) => doc.data());
   
    return orders;
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    throw error;
  }
}

// export const getCurrentUserBlogs = async (uid) => {
//   const noteSnapshot = await getDoc(doc(db, 'Blogs', uid));
//   if (noteSnapshot.exists()) {
//     console.log("Data found")
//    return  noteSnapshot.data();
    
//   } else {
//       console.log("Note doesn't exist");
//       return null;
//   }

// };
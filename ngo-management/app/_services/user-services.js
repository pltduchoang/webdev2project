import { collection, getDocs, getDoc ,addDoc, deleteDoc, doc, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../_utils/firebase';


// //Admin section
// const admin = require('firebase-admin');

// const serviceAccount = require('../../admin/ngomanagement-5fe54-firebase-adminsdk-su68d-560b43ab90.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com', // Replace with your database URL
// });



export const subscribeToUsers = (onUpdate) => {
  try {
    const usersData = collection(db, "users");
    return onSnapshot(usersData, (snapshot) => {
      const userList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const user = {
          id: doc.id,
          ...data,
          createAt: data.createAt ? data.createAt.toDate() : null,
        };
        return user;
      });
      console.log("User List:", userList);
      onUpdate(userList);
    });
  } catch (error) {
    console.error("Error in subscribeToShoppingList:", error);
    throw error;
  }
}



export const createUserProfile = async (userId, userData) => {
  const userRef = doc(db, 'users', userId); // 'users' is the collection name where user profiles are stored

  try {
    await setDoc(userRef, userData); // Save user data to Firestore
    console.log('User profile created successfully');
  } catch (error) {
    console.error('Error creating user profile:', error.message);
    // Handle any errors while creating user profile
    throw error;
  }
};

// Get all users from Firestore
export const getAllUsers = async () => {
  const usersRef = collection(db, 'users'); // 'users' is the collection name where user profiles are stored
  const snapshot = await getDocs(usersRef);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return users;
};


// Get a single user from Firestore by Email
export const getUserByEmail = async (email) => {
  const usersRef = collection(db, 'users'); // 'users' is the collection name where user profiles are stored
  const snapshot = await getDocs(usersRef);
  const user = snapshot.docs.find((doc) => doc.data().email === email);
  return user;
};



// // Admin
// // Delete user by email from Authentication
// async function deleteUserByEmail(email) {
//   try {
//     const user = await admin.auth().getUserByEmail(email);
//     await admin.auth().deleteUser(user.uid);
//     return user.uid; // Return the user ID if needed
//   } catch (error) {
//     console.error('Error deleting user from Authentication:', error);
//     throw error;
//   }
// }

// async function deleteUserData(userId) {
//   try {
//     await admin.firestore().collection('users').doc(userId).delete();
//     console.log('User data deleted from Firestore');
//   } catch (error) {
//     console.error('Error deleting user data from Firestore:', error);
//     throw error;
//   }
// }
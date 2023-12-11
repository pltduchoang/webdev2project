import { collection, getDocs, getDoc ,addDoc, deleteDoc, doc, updateDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../_utils/firebase';




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

// Get user from database by UID from user authentication
export const getUserByUid = async (id) => {
  const userDocRef = doc(db, 'users', id); // 'users' is the collection name where user profiles are stored
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = { ...userDoc.data(), id: userDoc.id };
    return userData;
  } else {
    return null; // User document with the given UID doesn't exist
  }
};


// Get a single user from Firestore by Email
export const getUserByEmail = async (email) => {
  const usersRef = collection(db, 'users'); // 'users' is the collection name where user profiles are stored
  const snapshot = await getDocs(usersRef);
  const user = snapshot.docs.find((doc) => doc.data().email === email);
  return user;
};


// update user profile
// 
export const updateUserProfile = async (userId, userData) => {
  const userRef = doc(db, 'users', userId); // 'users' is the collection name where user profiles are stored

  try {
    await updateDoc(userRef, userData); // Update user data in Firestore
    console.log('User profile updated successfully');
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    // Handle any errors while updating user profile
    throw error;
  }
};

// Delete user profile from Database
export const deleteUserProfile = async (userId) => {
  const userRef = doc(db, 'users', userId); // 'users' is the collection name where user profiles are stored

  try {
    await deleteDoc(userRef);
    console.log('User profile deleted successfully');
  } catch (error) {
    console.error('Error deleting user profile:', error.message);
    // Handle any errors while deleting user profile
    throw error;
  }
};


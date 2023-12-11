import admin from 'firebase-admin';
import serviceAccount from '../../../../admin/admin.json';

const initializeAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Add other configuration options if needed
    });
  }
};

export default async (req, res) => {
  initializeAdmin();

  try {
    const { uid } = req.query; // Fetch user ID from query parameters or body

    // Delete the user
    await admin.auth().deleteUser(uid);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
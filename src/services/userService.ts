'use server';

import clientPromise from '@/lib/db';
import type { User } from '@/lib/types';
import { ObjectId } from 'mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db(); 
  return db.collection<User>('users');
};

// Using a hardcoded ID for now as there is no auth
const hardcodedUserId = '66a012345678901234567890'; 

export async function getUserProfile(): Promise<User | null> {
  try {
    const usersCollection = await getCollection();
    
    // Check if the user exists, if not, create one
    let user = await usersCollection.findOne({ _id: new ObjectId(hardcodedUserId) });

    if (!user) {
        user = {
            _id: new ObjectId(hardcodedUserId),
            username: 'john.doe',
            email: 'john.doe@example.com',
            bio: 'I am a ServiceNow developer with a passion for creating efficient and user-friendly applications.',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        };
        await usersCollection.insertOne(user);
    }

    // Convert ObjectId to string for client-side usage
    return { ...user, _id: user._id.toString() };
  } catch (error) {
    console.error('Failed to get user profile:', error);
    // In a real app, you'd want more robust error handling
    return null;
  }
}

export async function updateUserProfile(profileData: Partial<User>): Promise<boolean> {
  try {
    const usersCollection = await getCollection();
    const { _id, ...dataToUpdate } = profileData;

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(hardcodedUserId) },
      { $set: dataToUpdate }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return false;
  }
}

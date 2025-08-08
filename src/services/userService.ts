'use server';

import clientPromise from '@/lib/db';
import type { User } from '@/lib/types';
import { ObjectId } from 'mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  const db = client.db(); 
  return db.collection<User>('users');
};

const defaultUserId = '001';

export async function getUserProfile(): Promise<User | null> {
  try {
    const usersCollection = await getCollection();
    
    let user = await usersCollection.findOne({ userId: defaultUserId });

    if (!user) {
        const newUser: Omit<User, '_id' | 'userId'> & { userId: string } = {
            userId: defaultUserId,
            username: 'john.doe',
            email: 'john.doe@example.com',
            bio: 'I am a ServiceNow developer with a passion for creating efficient and user-friendly applications.',
            avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        };
        const result = await usersCollection.insertOne(newUser as User);
        user = { ...newUser, _id: result.insertedId };
    }

    if (!user) {
        return null;
    }

    return { ...user, _id: user._id.toString() };
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return null;
  }
}

export async function updateUserProfile(profileData: Partial<User>): Promise<boolean> {
  try {
    const usersCollection = await getCollection();
    const { _id, userId, ...dataToUpdate } = profileData;

    const result = await usersCollection.updateOne(
      { userId: defaultUserId },
      { $set: dataToUpdate }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Failed to update user profile:', error);
    return false;
  }
}

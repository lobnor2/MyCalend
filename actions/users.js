"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

//updateUsername takes username that has to be updated in db
export async function updateUsername(username) {
  //userId for verifying is user is logged in or not
  const { userId } = auth();

  //throw error if user is not logged in
  if (!userId) {
    throw new Error("Unauthorized");
  }
  // check if username is already taken,
  const existingUsername = await db.user.findUnique({
    where: { username },
  });

  //throw error if there is existingUsername and one who is changing the username
  if (existingUsername && existingUsername.id !== userId) {
    throw new Error("Username is already taken");
  }

  //update username in database
  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  //update username also in clerk
  await clerkClient.users.updateUser(userId, {
    username,
  });

  return {
    success: true,
  };
}

export async function getUserByUsername(username) {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });
  return user;
}

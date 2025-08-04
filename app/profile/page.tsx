import { prisma } from "../lib/prisma";
import { auth } from "@/auth";
import ProfileCard from "../components/ProfileCard";
import { Metadata } from "next";
import { getUserId } from "../utility/useUser";

export const metadata: Metadata = {
  title: "Profile", // Dynamic title for profile page
};

export default async function ProfilePage() {
  const session = await auth();
  console.log(session);
  console.log(session?.user);

  if (!session || !session.user) {
    return (
      <p className="text-red-500">You must be logged in to view this page.</p>
    );
  }

  const email = session.user.email;
  if (!email) {
    return <p className="text-red-500">User email not found.</p>;
  }

  const userId = await getUserId();

  console.log("User email: ", email);
  console.log("User ID: ", userId);

  const user = await prisma.users.findUnique({
    where: { id: Number(userId) },
    select: {
      firstname: true,
      lastname: true,
      email: true,
      zip: true,
      username: true,
      userrole: true,
    },
  });

  console.log("User data: ", user);

  if (!user) {
    return <p className="text-red-500">User not found.</p>;
  }

  return (
    <div>
      <ProfileCard user={user} />
    </div>
  );
}

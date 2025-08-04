import { auth } from "@/auth";

// Utility function for getting the user ID
export const getUserId = async () => {

  //console.log("Fetching session using auth()...");
  const session = await auth();

  //console.log("Session received:", session);
  //console.log(session?.user?.id)

  if (session && session.user && session.user.id) {
    //console.log("returned ", session.user.id)
    return session.user.id;
  }

  return null;
};

// Utility function for getting the user name
export const getUserName = async () => {

  //console.log("Fetching session using auth()...");
  const session = await auth();

  //console.log("Session received:", session);
  //console.log(session?.user?.id)

  if (session && session.user && session.user.name) {
    //console.log("returned ", session.user.name)
    return session.user.name;
  }

  return null;
};

export const getUserIdRoute = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userId`); 
    console.log(response);
    if (!response.ok) return null;

    const data = await response.json();
    return data.userId || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
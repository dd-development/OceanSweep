import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.name) {
      return new Response(JSON.stringify({ userId: session.user.id }), {
        status: 200,
      });
    }
    return new Response(JSON.stringify({ userId: null }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch session" }), {
      status: 500,
    });
  }
}

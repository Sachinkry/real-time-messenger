import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.email) {
    return response.status(401).end();
  }

  const { socket_id: socketId, channel_name: channel } = request.body; // Destructure socket_id and channel_name

  // Log the values for debugging
  console.log('Socket ID:', socketId);
  console.log('Channel Name:', channel);

  // Validate socketId and channel
  if (!socketId || !channel) {
    return response.status(400).json({ error: 'Invalid socket_id or channel_name' });
  }

  const data = {
    user_id: session.user.email
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);

  return response.send(authResponse);
}

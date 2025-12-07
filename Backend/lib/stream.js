
import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

let streamClient = null;

const getStreamClient = () => {
  if (!ENV.STREAM_API_KEY || !ENV.STREAM_API_SECRET) {
    console.warn("⚠️ Stream credentials not set. Skipping Stream operations.");
    return null;
  }

  if (!streamClient) {
    streamClient = StreamChat.getInstance(
      ENV.STREAM_API_KEY,
      ENV.STREAM_API_SECRET
    );
  }

  return streamClient;
};

/**
 * Create or update a user in Stream Chat
 */
export const upsertStreamUser = async ({ id, name, image }) => {
  const client = getStreamClient();
  if (!client) return;

  await client.upsertUser({
    id,
    name,
    image,
  });

  console.log("✅ Stream user upserted:", id);
};

/**
 * Delete a user from Stream Chat
 */
export const deleteStreamUser = async (id) => {
  const client = getStreamClient();
  if (!client) return;

  await client.deleteUser(id, {
    mark_messages_deleted: true,
    hard_delete: true,
  });

  console.log("🗑️ Stream user deleted:", id);
};

/**
 * Convenience: sync from Mongo User document
 */
export const syncStreamUser = async (user) => {
  if (!user) return;

  const name =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email;

  await upsertStreamUser({
    id: user.clerkId.toString(),
    name,
    image: user.imageUrl,
  });

  console.log("🔄 Stream user synced from Mongo user:", user.clerkId);
};

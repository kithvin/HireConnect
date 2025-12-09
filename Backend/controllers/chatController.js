// Function to generate a stream token for a user
export async function getStreamToken(req, res) {
    try {
        // Create a token using the user's clerkId
        const token = chatClient.createToken(req.user.clerkId);

        // Respond with the token and user details
        res.status(200).json({ token, userId: req.user.clerkId, userName: req.user.name, userImage: req.user.image });
    } catch (error) {
        // Log the error and respond with a 500 status code
        console.error("Error generating token:", error);
        res.status(500).json({ message: "Error generating token" });
    }
}
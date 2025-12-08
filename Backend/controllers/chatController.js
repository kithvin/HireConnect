export async function getStreamToken(req, res) {
    try {
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({ token, userId: req.user.clerkId, userName: req.user.name,userImage:req.user.image });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ message: "Error generating token" });
    }
}
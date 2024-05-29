import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { accessToken, title, content, linkedInURN } = req.body;

      if (!accessToken || !title || !content || !linkedInURN) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const response = await axios.post(
        "https://api.linkedin.com/v2/ugcPosts",
        {
          author: `urn:li:person:${linkedInURN}`,
          lifecycleState: "PUBLISHED",
          specificContent: {
            "com.linkedin.ugc.ShareContent": {
              shareCommentary: {
                text: content,
              },
              shareMediaCategory: "NONE",
            },
          },
          visibility: {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      console.error(
        "Error posting to LinkedIn:",
        error.response?.data || error.message
      );
      res.status(500).json({ error: "Error posting to LinkedIn" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

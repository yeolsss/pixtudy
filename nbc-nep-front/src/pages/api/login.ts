import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { event, session } = req.body;

  switch (event) {
    case "INITIAL_SESSION":
      if (session) {
        res.setHeader(
          "Set-Cookie",
          `access_token=${session.access_token}; Path=/; HttpOnly; Max-Age=${session.expires_in}`
        );
        return res.status(200).json({ message: "initialSession" });
      } else {
        // 세션이 없을 경우의 처리
        return res.status(400).json({ message: "No session provided" });
      }
    case "SIGNED_IN":
      // Set cookie on successful sign in
      res.setHeader(
        "Set-Cookie",
        `access_token=${session.access_token}; Path=/; HttpOnly; Max-Age=${session.expires_in}`
      );
      return res.status(200).json({ message: "login" });
    case "SIGNED_OUT":
      // Clear cookie on sign out
      res.setHeader(
        "Set-Cookie",
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      );
      return res.status(200).json({ message: "logout" });
    default:
      return res.status(400).json({ message: "bad request" });

    // Handle other cases as needed
  }
}

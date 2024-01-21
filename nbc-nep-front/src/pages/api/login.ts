export default async function handler(req: any, res: any) {
  const { event, session } = req.body;

  switch (event) {
    case "INITIAL_SESSION":
      if (session) {
        res.setHeader(
          "Set-Cookie",
          `access_token=${session.access_token}; Path=/; HttpOnly; Secure; Max-Age=${session.expires_in}`
        );
        res.status(200).json({ message: "login" });
      }
      break;
    case "SIGNED_IN":
      // Set cookie on successful sign in
      res.setHeader(
        "Set-Cookie",
        `access_token=${session.access_token}; Path=/; HttpOnly; Secure; Max-Age=${session.expires_in}`
      );
      res.status(200).json({ message: "login" });
      break;
    case "SIGNED_OUT":
      // Clear cookie on sign out
      res.setHeader(
        "Set-Cookie",
        "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;"
      );
      res.status(200).json({ message: "logout" });
      break;
    // Handle other cases as needed
  }
}

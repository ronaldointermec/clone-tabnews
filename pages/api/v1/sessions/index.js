import { createRouter } from "next-connect";
// import * as cookie from "cookie";
import controller from "infra/controller.js";
import authentication from "models/authentication.js";
import session from "models/session.js";

const router = createRouter();
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await authentication.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser.id);

  // const setCooke = cookie.serialize("session_id", newSession.token, {
  //   path: "/",
  //   // expires: new Date(newSession.expires_at),
  //   maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000, // Convert milliseconds to seconds
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   // sameSite: "strict",
  // });

  // response.setHeader("Set-Cookie", setCooke);

  controller.setSessionCookie(newSession.token, response)

  return response.status(201).json(newSession);
}

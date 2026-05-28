import { createRouter } from "next-connect";
import controller from "infra/controller.js";

const router = createRouter();
router.post(postHandler);

export default router.handler(controller.errorHandler);

async function postHandler(request, response) {
  return response.status(201).json({});
}

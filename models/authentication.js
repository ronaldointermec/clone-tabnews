import user from "models/user.js";
import password from "models/password";
import { UnauthorizedError, NotFoundError } from "infra/errors.js";

async function getAuthenticatedUser(providedEmail, providedPassworld) {
  try {
    const storageUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassworld, storageUser.password);
    return storageUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }
    throw error;
  }

  async function findUserByEmail(providedEmail) {
    let storageUser;

    try {
      storageUser = await user.findOneByEmail(providedEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email não confere.",
          action: "Verifique este dado está correto.",
        });
      }

      throw error;
    }
    return storageUser;
  }

  async function validatePassword(providedPassworld, storageUserPassword) {
    const correctPasswordMatch = await password.compare(
      providedPassworld,
      storageUserPassword,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Senha não confere.",
        action: "Verifique este dado está correto.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;

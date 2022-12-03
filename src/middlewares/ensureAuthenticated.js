const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("JWT Token não informado.", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub:user_id } = verify(token, authConfig.jwt.secret); 
    /* 
      O sub é o conteúdo armazenado no token. Ele é devolvido na função verify. 
      E eu passo a chama-lo de user_id.
    */

    request.user = {
      id: Number(user_id),
    };
    /* Acima, criamos a propriedade user na requisição e a propriedade id dentro de user. */

    return next();
  } catch {
    throw new AppError("JWT Token inválido.", 401);
  }
}

module.exports = ensureAuthenticated;
import jwt from 'jsonwebtoken';
import config from './config';

const getToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "48h",
    });
};

const isAuth = (req, res, next) => {
  // Get the token for authorization.
  const token = req.headers.authorization;
  if(token) {
    // Acces to only token part.
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if(err) {
        return res.status(401).send({msg: 'Invalid Token'});
      }
      // We like to save the decoder data to the user.
      req.user = decode;
      // Next for thne next step.
      next();
      return;
    });
  } else {
     // If token does not exist. So, send message
  return res.status(401).send({msg: 'Token is not supplied.'});
  }
}

const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin) {
    return next();
  }
  else{
    return res.status(401).send({msg: 'Admin Token is not valid.'});
  }
}

export { getToken, isAuth, isAdmin };

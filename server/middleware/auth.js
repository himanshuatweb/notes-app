import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      console.log("In if ")
      decodedData = jwt.verify(token, 'SECRET_PASSWORD');
      req.userId = decodedData?.id;
      console.log(req.userId);
    } else {
      console.log("In else ")
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
      console.log(req.userId);
    }
    next();
  } catch (error) {
    console.log('Something went wrong in server ->auth.js ', error.message);
    res.status(400).json({message:error.message})
  }
};

export default auth;
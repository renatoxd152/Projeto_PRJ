import jwt from 'jsonwebtoken';
import config from '../utils/config.js';
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    userType: user.tipo,
  };

  return jwt.sign(payload, config, { expiresIn: '1h' });
};

export default generateToken;
import crypto from 'crypto';

const generateRandomToken = (length = 32) => {
    return crypto.randomBytes(length).toString("hex"); // Generates a random hex token
  };

  export {generateRandomToken}
import sha256 from 'sha256';

/**
 * return hashed password followed sha256.
 * @param {*} password
 */
export const generatehashedPassword = password => sha256(password);

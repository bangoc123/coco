
export const underscoreId = '_id';

export const config = {
    passport: {
        secret: 'unesco-hackathon',
        expiresIn: 9007199254740991,
    },
    env: {
        dev: {
        port: 80,
        mongoDBUri: 'mongodb://localhost/unesco',
        },
    },
};
  
  
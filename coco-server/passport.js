/* eslint-disable import/prefer-default-export */
import { Strategy, ExtractJwt } from 'passport-jwt';
import { config, underscoreId } from './global';
import { Admin } from './db/models';

export const applyPassportStrategy = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.passport.secret;
  passport.use(new Strategy(opts, (payload, done) => {
    Admin.findOne({ username: payload.username }, (err, admin) => {
      if (err) {
        return done(err, false);
      }
      if (admin) {
        return done(null, {
          username: admin.username,
          _id: admin[underscoreId],
        });
      }
      return done(null, false);
    });
  }));
};

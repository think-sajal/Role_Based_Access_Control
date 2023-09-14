import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import { ManagementClient } from "auth0";
dotenv.config()

const client = jwksClient({ jwksUri: process.env.JWKS_URI });

const AuthService = {
  authenticate: (req, _res, next) => {
    try {
      const getKey = (header, callback) => {
        client.getSigningKey(header.kid, function (_err, key) {
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      }

      const { identitytoken } = req.headers;
      jwt.verify(identitytoken, getKey, { algorithm: "RS256" }, (err, decoded) => {
        if (err) {
          throw new Error('UNAUTHENTICATED');
        }
        req.decoded = decoded;
        next();
      });
    } catch (error) {
      console.log("[JWT] Error getting JWT token");
      throw error;
    }
  },

  accessRole: (req, _res, next) => {
    try {
      const { role } = req.decoded;
      if (!role.includes('Admin')) {
        throw new Error('Permission Denied');
      }
      next();
    } catch (error) {
      console.log("[JWT] Error getting roles");
      throw error;
    }
  },

  managementClient: new ManagementClient({
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scope: process.env.SCOPE,
  })
};

export default AuthService;

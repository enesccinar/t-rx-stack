import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
// import type { GoogleProfile } from "remix-auth-socials";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

export const authenticator = new Authenticator(sessionStorage);

// callback function that will be invoked upon successful authentication from social provider
async function handleSocialAuthCallback(profile: any) {
  // create user in your db here
  // profile object contains all the user data like image, displayName, id
  return profile;
}

// Configuring Google Strategy
authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      scope: ["openid", "email", "profile"],
      callbackURL: `http://localhost:3000/auth/${SocialsProvider.GOOGLE}/callback`,
    },
    handleSocialAuthCallback
  )
);

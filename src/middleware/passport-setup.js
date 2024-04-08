const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongodb = require('../db/connect');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'prod'
        ? 'https://cse341-w5-w8-project.onrender.com/auth/google/redirect'
        : 'http://localhost:3000/auth/google/redirect'
},
async (accessToken, refreshToken, profile, done) => {
  const db = mongodb.getDb().db('librarydb');
  try {
    // Try to find the user in the database
    let user = await db.collection('users').findOne({ googleId: profile.id });
    if (!user) {
      // If not found, create a new user
      const insertResult = await db.collection('users').insertOne({
        googleId: profile.id,
        name: profile.displayName
        // Include any other profile information you need
      });
      // Check if the insert operation was successful
      if (insertResult.acknowledged) {
        // Fetch the new user document using the insertedId
        user = await db.collection('users').findOne({ _id: insertResult.insertedId });
      } else {
        throw new Error('Insert operation failed');
      }
    }
    done(null, user); // Proceed with the logged in user
  } catch (error) {
    done(error);
  }
}));

// Serialize the user for the session
passport.serializeUser((user, done) => {
  done(null, user.googleId); // Serialize user's Google ID for the session
});

// Deserialize the user from the session
passport.deserializeUser(async (googleId, done) => {
  const db = mongodb.getDb().db('librarydb');
  try {
    // Find the user by Google ID and attach the user object to req.user
    const user = await db.collection('users').findOne({ googleId: googleId });
    done(null, user); // This will attach the user to req.user in your routes
  } catch (error) {
    done(error);
  }
});

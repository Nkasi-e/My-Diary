module.exports = async function strategyCallback(
  token,
  tokenSecret,
  profile,
  done
) {
  // Get access to the user details and send it to the controller
  let user;
  try {
    if (profile.name === undefined || profile.name === undefined) {
      // Check if the profile comes with the complete user details
      user = {
        name: profile.displayName,
        email: profile.emails[0].value,
        password: profile.id,
        account_type: profile.provider,
      };
      done(null, user);
    } else {
      user = {
        firstName: profile.name.givenName,
        email: profile.emails[0].value,
        password: profile.id,
        account_type: profile.provider,
      };
      done(null, user);
    }
  } catch (error) {
    done(error, false, error.message);
  }
};

passport = require("passport");

module.exports = (app) => {
  // google auth
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    function (req, res) {
      // Successful authentication, redirect home.
      res.send(req.user);
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  //facebook auth

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook"),
    function (req, res) {
      // Successful authentication, redirect home.
      res.send(req.user);
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook"),
    function (req, res) {
      // Successful authentication, redirect home.
      res.send(req.user);
    }
  );
  //github auth

  app.get("/auth/github", passport.authenticate("github"), function (req, res) {
    // Successful authentication, redirect home.
    res.send(req.user);
  });

  app.get(
    "/auth/github/callback",
    passport.authenticate("github"),
    function (req, res) {
      // Successful authentication, redirect home.
      res.send(req.user);
    }
  );
};

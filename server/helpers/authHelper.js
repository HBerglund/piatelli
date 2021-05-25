function loggedInUser(req) {
  if (req.session.user) {
    return true;
  } else {
    return false;
  }
}

function userIsAdmin(req) {
  if (loggedInUser(req) && req.session.user.role === "admin") {
    return true;
  } else {
    return false;
  }
}

async function userHaveAccess(req, userID) {
  if (loggedInUser(req) && req.session.user._id == userID) {
    return true;
  } else {
    return false;
  }
}

module.exports = { loggedInUser, userIsAdmin, userHaveAccess };

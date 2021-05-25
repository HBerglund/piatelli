function loggedInUser(req) {
  if (req.session) {
    return true;
  } else {
    return false;
  }
}

function userIsCustomer(req) {
  if (loggedInUser(req) && req.session.user.role === "customer") {
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
  if (loggedInUser(req) && req.session.user._id === userID) {
    return true;
  } else {
    return false;
  }
}

module.exports = { loggedInUser, userIsCustomer, userIsAdmin, userHaveAccess };

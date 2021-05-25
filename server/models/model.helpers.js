const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

const validateImgUrl = (url) => {
  const re = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
  return re.test(url);
};

module.exports = { validateEmail, validatePhone, validateImgUrl };

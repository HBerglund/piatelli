const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;
  return re.test(phone);
};

const validateImgUrl = (url) => {
  const re = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
  return re.test(url);
};

const removeWhiteSpace = (string) => {
  return string.replace(/ /g, "");
};

module.exports = {
  validateEmail,
  validatePhone,
  validateImgUrl,
  removeWhiteSpace,
};

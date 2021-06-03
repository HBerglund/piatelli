/**
 * RegEx validaton for different RegEx types
 * @param {string} type The RegEx type want to test against, e.g. 'phone'
 * @param {string} value Value to test on RegEx type
 * @returns {boolean} Test result - true/false
 */
const runRegExValidation = (type, value) => {
  let re = new RegExp();
  switch (type) {
    case "email":
      re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      break;
    case "password":
      re = /^[A-Za-z0-9]\w{5,}$/;
      break;
    case "phone":
      re = /^(([+]46)\s*(7)|07)[02369]\s*(\d{4})\s*(\d{3})$/;
      break;
    case "image url":
      re = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;
      break;
    case "zipcode":
      re = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/;
      break;
    case "product name" ||
      "category" ||
      "address" ||
      "country" ||
      "street" ||
      "delivery name" ||
      "city": // validates that there is no special characters
      re = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
      break;
    case "fullName":
      re = /^[a-zA-ZäöåÄÖÅ ,.'-]+$/;
      break;
    case "price" || "stock":
      re = /^[0-9]*$/;
      break;
    case "card number":
      re =
        /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
      break;
    case "cvc":
      re = "/^[0-9]{3,3}$/";
    default:
      return true;
  }
  return re.test(value);
};

module.exports = runRegExValidation;

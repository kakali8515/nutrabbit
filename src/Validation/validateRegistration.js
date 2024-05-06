import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const validateRegistration = (data) => {
  let errors = {};

  const { termsCheck, personalCheck, name, username, isIDVerified, password, confirmPassword, email, emailOTP, isOtpVerified, phoneNumber, address, detsilAddress, account_type, businessNumber, businessName, depertment, contactPerson } = data;


  if (termsCheck == false) {
    errors.termsCheck = "Please check the terms";
  }
  if (personalCheck == false) {
    errors.personalCheck = "Please check personal information";
  }
  if (account_type == 'business') {
    if (validator.isEmpty(businessNumber)) {
      errors.businessNumber = t('common.Error.BusinessNo');
    }
    if (validator.isEmpty(businessName)) {
      errors.businessName = t('common.Error.BusinessName');
    }
    if (validator.isEmpty(depertment)) {
      errors.depertment = t('common.Error.department');
    }
    if (validator.isEmpty(contactPerson)) {
      errors.contactPerson = t('common.Error.contactPerson');
    }
  }
  if (validator.isEmpty(name)) {
    errors.name = t('common.Error.EnterName');
  }
  if (validator.isEmpty(username)) {
    errors.username = t('common.Error.EnterId');
  }
  else if (!(validator.isAlphanumeric(username))) {
    errors.username = t("common.Error.useridFormatSignup");
  }
  else if (isIDVerified == false) {
    errors.username = t("common.Error.checkIdAvailable");
  }

  if (validator.isEmpty(password)) {
    errors.password = t('common.Error.PasswordFormat');
  }
  else if (!(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,20}$/))) {
    errors.password = t('common.Error.PasswordFormat');
  }
  if (validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = t('common.Error.ConfirmPassword');
  }
  if (!validator.equals(password, confirmPassword)) {
    errors.confirmPassword = t('common.Error.checkPassword');
  }
  if (!validator.isEmail(email)) {
    errors.email = t("common.Error.ValidEmail");
  }
  if (validator.isEmpty(email)) {
    errors.email = t('common.Error.EnterEmail');
  }
  if (validator.isEmpty(emailOTP)) {
    errors.emailOTP = t('common.Error.EnterOtp');
  } else if (isOtpVerified == false) {
    errors.emailOTP = t('common.Error.VerifyOtp');
  }

  if (validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = t('common.Error.EnterPhone');
  } else if (!validator.isNumeric(phoneNumber)) {
    errors.phoneNumber = t("common.Error.OnlyNumber");
  }
  if (validator.isEmpty(address) || validator.isEmpty(detsilAddress)) {
    errors.address = t('common.Error.EnterAddress');
  }


  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  };
};

export default validateRegistration;

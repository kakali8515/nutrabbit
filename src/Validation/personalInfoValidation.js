import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const personalInfoValidation = (data) => {
  let errors = {};

  const { name, password, confirmPassword, phoneNumber, address } = data;

  if (validator.isEmpty(name)) {
    errors.name = t('common.Error.EnterName');
  }

  if(!validator.isEmpty(password)) {
    if (!(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,20}$/))) {
      errors.password = t('common.Error.PasswordFormat');
    }
    if (validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = t('common.Error.ConfirmPassword');
    }
    if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword = t('common.Error.checkPassword');
    }
  }
  
  if (validator.isEmpty(phoneNumber)) {
    errors.phoneNumber = t('common.Error.EnterPhone');
  }else if(!validator.isNumeric(phoneNumber)){
    errors.phoneNumber = t("common.Error.OnlyNumber");
  }
  if (validator.isEmpty(address)) {
    errors.address = t('common.Error.EnterAddress');
  }

  // if (validator.isEmpty(reason)) {
  //   errors.reason = "Please enter your reason";
  // }


  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  };
};

export default personalInfoValidation;

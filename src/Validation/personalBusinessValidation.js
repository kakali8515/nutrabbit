import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const personalBusinessValidation = (data) => {
  let errors = {};

  const { business_number, business_name, department, contactPerson, password, 

    confirmPassword, phoneNumber, address } = data;

  // if (account_type == 'business') {
    if (validator.isEmpty(business_number)) {
      errors.businessNumber = t('common.Error.BusinessNo');
    }
    if (validator.isEmpty(business_name)) {
      errors.businessName = t('common.Error.BusinessName');
    }
    if (validator.isEmpty(department)) {
      errors.department = t('common.Error.department');
    }
    if (validator.isEmpty(contactPerson)) {
      errors.contactPerson = t('common.Error.contactPerson');
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

    // if (withdraw_type == "bussiness") {
    //     if (validator.isEmpty(reason)) {
    //         errors.reason = "Please enter your reason";
    //     }
    // }

  return {
    isInvalid: Object.keys(errors).length > 0,
    error: errors
  };
};

export default personalBusinessValidation;

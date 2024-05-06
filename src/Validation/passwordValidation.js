import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const passwordValidation = (data) => {
    let errors = {};

    const { password, confirmPassword, } = data;

    if (validator.isEmpty(password)) {
        errors.password = t('common.Error.EnterPassword');
    }
    else if (!(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,20}$/))) {
        errors.password = t('common.Error.PasswordFormat');
    }
    if (validator.isEmpty(confirmPassword)) {
        errors.confirmPassword =  t('common.Error.ConfirmPassword');
    }
    if (!validator.equals(password, confirmPassword)) {
        errors.confirmPassword =t('common.Error.checkPassword');
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default passwordValidation;

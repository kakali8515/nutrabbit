import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const validateLogin = (data) => {
    let errors = {};

    const { email,password } = data;

    if (validator.isEmpty(password)) {
        errors.password = t('common.Error.EnterPassword');
    }
    if (validator.isEmpty(email)) {
        errors.email = t('common.Error.EnterId');
    }
    // else if (!validator.isEmail(email)) {
    //     errors.email = "Enter a valid email address";
    // }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default validateLogin;

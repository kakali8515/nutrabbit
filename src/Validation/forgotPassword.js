import validator from "validator";
import i18n from '../config/i18n';

const { t } = i18n.global;
i18n.global.locale = 'kr';

const forgotPassword = (data) => {
    let errors = {};
    const { userId, email, emailOTP, validation_type, isConfirmOTP} = data;

    if(validation_type == 'forgotPassword'){
        if (validator.isEmpty(userId)) {
            errors.userId = t('common.Error.EnterId');
        }
    }
    if (validator.isEmpty(email)) {
        errors.email = t('common.Error.EnterEmail');
    }
    else if (!validator.isEmail(email)) {
        errors.email = t("common.Error.ValidEmail");
    }
    if (validator.isEmpty(emailOTP)) {
        errors.emailOTP =  t('common.Error.EnterOtp');
    }
    else if (isConfirmOTP==0) {
        errors.emailOTP = t('common.Error.FindIdOtpVerify');
    }

    return {
        isInvalid: Object.keys(errors).length > 0,
        error: errors
    };
};

export default forgotPassword;

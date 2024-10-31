package com.mk.qr_tracking_system_dss.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.Date;
import java.util.Calendar;

public class ExpDateValidator implements ConstraintValidator<ExpDateFuture, Date> {

    @Override
    public void initialize(ExpDateFuture constraintAnnotation) {
    }

    @Override
    public boolean isValid(Date expDate, ConstraintValidatorContext context) {
        if (expDate == null) {
            return true; // null değerler için başka bir anotasyon ile kontrol et
        }

        // Bugünkü tarihi al
        Calendar today = Calendar.getInstance();
        today.set(Calendar.HOUR_OF_DAY, 0);
        today.set(Calendar.MINUTE, 0);
        today.set(Calendar.SECOND, 0);
        today.set(Calendar.MILLISECOND, 0);

        // Tarihin bugünden sonraki bir tarih olup olmadığını kontrol et
        return expDate.after(today.getTime());
    }
}
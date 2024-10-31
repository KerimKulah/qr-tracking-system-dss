package com.mk.qr_tracking_system_dss.validation;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ExpDateValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)

public @interface ExpDateFuture {
    String message() default "Son kullanım tarihi bugünden sonraki bir tarih olmalıdır.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
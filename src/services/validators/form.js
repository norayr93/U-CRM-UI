/* eslint-disable max-len */
/* eslint-disable no-debugger */
import * as R from 'ramda';
import validator from 'validator';

export const formValidator = (values, validationRules, additionalRules = {}) => {
    const additionalRulesKeys = Object.keys(additionalRules);
    additionalRulesKeys.forEach(
        key => validationRules[key] = [...validationRules[key].filter(r=>r.type!=='additional'), additionalRules[key]]
    );

    const validate = (field, value) => {
        return R.pipe(
            R.prop(field),
            R.unless(
                R.either(R.isNil, R.isEmpty),
                data => R.pipe(
                    R.find( rule => {
                        const func = R.pipe(
                            R.prop('custom'),
                            R.when(
                                R.isNil,
                                () => validator[rule.method],
                            ),
                        )(rule);
                        return R.not(func(value + '', rule.options));
                    }),
                    R.path(['message']),
                )(data),
            ),
        )(validationRules);
    };

    const errors = {};
    R.forEachObjIndexed((value, field) => {
        if (value instanceof Object) value = value['label'] || value['value'];
        const error = validate(field, value);
        if(error) {
            errors[field] = error;
        }
    }, values);

    return errors;
};
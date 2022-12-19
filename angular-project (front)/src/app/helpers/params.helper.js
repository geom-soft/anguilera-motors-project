import { isEmpty } from 'src/app/helpers/objects.helper';

export const getParams = (route) => {
    return new Promise((resolve, reject) => {
        route.params
            .subscribe(params => {
                if (!isEmpty(params)) {
                    resolve(params);
                } else {
                    resolve(null);
                }
            });
    });
};
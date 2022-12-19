import { HttpHeaders } from '@angular/common/http';

export const doPostForm = async(url, http, form, alerts) => {
    alerts.showLoader();

    // Object to array and set params body
    const mapped = Object.keys(form.value).map(key => ({ param: key, value: form.value[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return await http.post(url, body.toString(), { headers }).subscribe(data => {
        if (!data['error']) {
            alerts.closeLoader();
            alerts.createMessage('¡Acción realizada correctamente!', 3000, 'success');
        } else {
            alerts.closeLoader();
        }
    }, error => {
        alerts.closeLoader();
        console.error(error);
        alerts.createMessage('¡Error al realizar la acción!', 3000, 'danger');
    });
};

export const doPostObj = async(url, http, objData, alerts) => {
    alerts.showLoader();

    // Object to array and set params body
    const mapped = Object.keys(objData).map(key => ({ param: key, value: objData[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return await http.post(url, body.toString(), { headers }).subscribe(data => {
        if (!data['error']) {
            alerts.closeLoader();
            alerts.createMessage('¡Acción realizada correctamente!', 3000, 'success');
        } else {
            alerts.closeLoader();
        }
    }, error => {
        alerts.closeLoader();
        console.error(error);
        alerts.createMessage('¡Error al realizar la acción!', 3000, 'danger');
    });
};

export const doPostObjData = (url, http, objData, alerts) => {
    alerts.showLoader();

    // Object to array and set params body
    const mapped = Object.keys(objData).map(key => ({ param: key, value: objData[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return new Promise( (resolve, reject) => {
        http.post(url, body.toString(), { headers }).subscribe(data => {
            if (!data['error']) {
                alerts.closeLoader();
                alerts.createMessage('¡Acción realizada correctamente!', 3000, 'success');
                resolve(data['data'].results);
            } else {
                alerts.closeLoader();
                reject();
            }
        }, error => {
            alerts.closeLoader();
            console.error(error);
            alerts.createMessage('¡Error al realizar la acción!', 3000, 'danger');
            reject();
        });
    });
};

export const doPostFormData = (url, http, form, alerts) => {
    alerts.showLoader();

    // Object to array and set params body
    const mapped = Object.keys(form.value).map(key => ({ param: key, value: form.value[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return new Promise( (resolve, reject) => {
        http.post(url, body.toString(), { headers }).subscribe(data => {
            if (!data['error']) {
                alerts.closeLoader();
                alerts.createMessage('¡Acción realizada correctamente!', 3000, 'success');
                resolve(data['data'].results);
            } else {
                alerts.closeLoader();
                reject();
            }
        }, error => {
            alerts.closeLoader();
            console.error(error);
            alerts.createMessage('¡Error al realizar la acción!', 3000, 'danger');
            reject();
        });
    });
};

export const doPostObjNoData = (url, http, objData) => {

    // Object to array and set params body
    const mapped = Object.keys(objData).map(key => ({ param: key, value: objData[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return new Promise( (resolve, reject) => {
        http.post(url, body.toString(), { headers }).subscribe(data => {
            resolve(data);
        });
    });
};

export const doPostObjLoad = (url, http, objData, alerts) => {
    alerts.showLoader();

    // Object to array and set params body
    const mapped = Object.keys(objData).map(key => ({ param: key, value: objData[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return new Promise( (resolve, reject) => {
        http.post(url, body.toString(), { headers }).subscribe(data => {
            if (!data['error']) {
                alerts.closeLoader();
                resolve(data['data'].results);
            } else {
                alerts.closeLoader();
                reject();
            }
        }, error => {
            alerts.closeLoader();
            console.error(error);
            reject();
        });
    });
};

export const doPostObjResp = (url, http, objData) => {

    // Object to array and set params body
    const mapped = Object.keys(objData).map(key => ({ param: key, value: objData[key] }));
    const body = new URLSearchParams();
    mapped.forEach(item => {
        body.append(item.param, item.value);
    });

    // Set form headers
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

    // Send request
    return new Promise( (resolve, reject) => {
        http.post(url, body.toString(), { headers }).subscribe(data => {
            if (!data['error']) {
                resolve(data['data'].results);
            } else {
                reject();
            }
        }, error => {
            console.error(error);
            reject();
        });
    });
};
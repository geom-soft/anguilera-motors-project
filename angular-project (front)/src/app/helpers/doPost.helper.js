import { HttpHeaders } from '@angular/common/http';

export const doPostForm = async(url, http, form, alertify) => {
    alertify.showLoader();

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
            alertify.closeLoader();
            alertify.createMessage('¡Datos guardados correctamente!', 'success');
        } else {
            alertify.closeLoader();
        }
    }, error => {
        alertify.closeLoader();
        console.error(error);
        alertify.createMessage('¡Error al guardar los datos!', 'error');
    });
};

export const doPostObj = async(url, http, objData, alertify) => {
    alertify.showLoader();

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
            alertify.closeLoader();
            alertify.createMessage('¡Datos guardados correctamente!', 'success');
        } else {
            alertify.closeLoader();
        }
    }, error => {
        alertify.closeLoader();
        console.error(error);
        alertify.createMessage('¡Error al guardar los datos!', 'error');
    });
};

export const doPostObjData = (url, http, objData, alertify) => {
    alertify.showLoader();

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
                alertify.closeLoader();
                alertify.createMessage('¡Datos guardados correctamente!', 'success');
                resolve(data['data'].results);
            } else {
                alertify.closeLoader();
                reject();
            }
        }, error => {
            alertify.closeLoader();
            console.error(error);
            alertify.createMessage('¡Error al guardar los datos!', 'error');
            reject();
        });
    });
};

export const doPostFormData = (url, http, form, alertify) => {
    alertify.showLoader();

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
                alertify.closeLoader();
                alertify.createMessage('¡Datos guardados correctamente!', 'success');
                resolve(data['data'].results);
            } else {
                alertify.closeLoader();
                reject();
            }
        }, error => {
            alertify.closeLoader();
            console.error(error);
            alertify.createMessage('¡Error al guardar los datos!', 'error');
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

export const doPostObjLoad = (url, http, objData, alertify) => {
    alertify.showLoader();

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
                alertify.closeLoader();
                resolve(data['data'].results);
            } else {
                alertify.closeLoader();
                reject();
            }
        }, error => {
            alertify.closeLoader();
            console.error(error);
            reject();
        });
    });
};
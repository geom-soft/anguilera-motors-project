export const doGet = (url, http, alertify, loader = false) => {
    if (loader) {
        alertify.showLoader();
    }
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (loader) {
                    alertify.closeLoader();
                }
                if (data['error']) {
                    alertify.createMessage('Error al leer los datos', 'error');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                if (loader) {
                    alertify.closeLoader();
                }
                alertify.createMessage('Error al leer los datos', 'error');
                reject(error);
            }, () => {
                // Finally block
                try {
                    setTimeout(() => {
                        if (loader) {
                            alertify.closeLoader();
                        }
                    }, 3000);
                } catch (e) {}
            });
    });
};

export const doDelete = (url, http, alertify) => {
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (data['error']) {
                    alertify.createMessage('Error al eliminar el registro', 'error');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                alertify.createMessage('Error al eliminar el registro', 'error');
                reject(error);
            });
    });
};

export const doCancel = (url, http, alertify) => {
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (data['error']) {
                    alertify.createMessage('Error al cancelar el registro', 'error');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                alertify.createMessage('Error al cancelar el registro', 'error');
                reject(error);
            });
    });
};

export const doGetNoData = (url, http) => {
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(() => {
                resolve();
            }, error => {
                reject(error);
            });
    });
};

export const doGetCORS = (url, http, alertify, loader = false) => {
    if (loader) {
        alertify.showLoader();
    }
    return new Promise((resolve, reject) => {
        http.get(url, {withCredentials: true})
            .subscribe(data => {
                if (loader) {
                    alertify.closeLoader();
                }
                if (data['error']) {
                    alertify.createMessage('Error al leer los datos', 'error');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                if (loader) {
                    alertify.closeLoader();
                }
                alertify.createMessage('Error al leer los datos', 'error');
                reject(error);
            }, () => {
                // Finally block
                try {
                    setTimeout(() => {
                        if (loader) {
                            alertify.closeLoader();
                        }
                    }, 3000);
                } catch (e) {}
            });
    });
};
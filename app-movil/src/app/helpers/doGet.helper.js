export const doGet = (url, http, alerts, loader = false) => {
    if (loader) {
        alerts.showLoader();
    }
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (loader) {
                    alerts.closeLoader();
                }
                if (data['error']) {
                    alerts.createMessage('Error al leer los datos');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                if (loader) {
                    alerts.closeLoader();
                }
                alerts.createMessage('Error al leer los datos');
                reject(error);
            }, () => {
                // Finally block
                try {
                    setTimeout(() => {
                        if (loader) {
                            alerts.closeLoader();
                        }
                    }, 3000);
                } catch (e) {}
            });
    });
};

export const doDelete = (url, http, alerts) => {
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (data['error']) {
                    alerts.createMessage('Error al eliminar el registro');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                alerts.createMessage('Error al eliminar el registro');
                reject(error);
            });
    });
};

export const doCancel = (url, http, alerts) => {
    return new Promise((resolve, reject) => {
        http.get(url)
            .subscribe(data => {
                if (data['error']) {
                    alerts.createMessage('Error al cancelar el registro');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                alerts.createMessage('Error al cancelar el registro');
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

export const doGetCORS = (url, http, alerts, loader = false) => {
    if (loader) {
        alerts.showLoader();
    }
    return new Promise((resolve, reject) => {
        http.get(url, {withCredentials: true})
            .subscribe(data => {
                if (loader) {
                    alerts.closeLoader();
                }
                if (data['error']) {
                    alerts.createMessage('Error al leer los datos');
                    reject(data['message']);
                } else {
                    resolve(data['data'].results);
                }
            }, error => {
                if (loader) {
                    alerts.closeLoader();
                }
                alerts.createMessage('Error al leer los datos');
                reject(error);
            }, () => {
                // Finally block
                try {
                    setTimeout(() => {
                        if (loader) {
                            alerts.closeLoader();
                        }
                    }, 3000);
                } catch (e) {}
            });
    });
};
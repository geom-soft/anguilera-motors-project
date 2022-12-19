export const calculaEdad = (date) => {
    const now = new Date();
    let edad = 0;
    try {
        edad = now.getFullYear() - date.getFullYear();
        if (date) {
            const mes = now.getMonth() - date.getMonth();
            if (mes < 0 || (mes === 0 && now.getDate() < date.getDate())) {
                edad--;
            }
        }
    } catch (e) {
        edad = 0;
    }
    return edad;
};
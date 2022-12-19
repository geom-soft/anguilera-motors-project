export const formValido = (form) => {
  
  if (!form.valid) {
    // setFocus sobre el input invalido
    for (let i in form['_directives']) {
      if (form['_directives'][i].control.invalid) {
        const inputName = form['_directives'][i].name;
        document.getElementsByName(inputName)[0].focus();
        break;
      }
    }
    // marca los inputs como Touched para que arroje el error
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    return false;
  } else {
    return true;
  }

};
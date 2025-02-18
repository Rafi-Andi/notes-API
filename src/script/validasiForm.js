export const customValidationUsernameHandler = (event) => {
  event.target.setCustomValidity("");

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity("Wajib diisi.");
    return;
  }

  if (event.target.validity.tooLong) {
    event.target.setCustomValidity("Maximal panjang adalah 20 karakter.");
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity("Minimal panjang adalah 6 karakter.");
    return;
  }

  
};

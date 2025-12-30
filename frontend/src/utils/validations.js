export const validateName = (name) =>
  /^[A-Za-z ]+$/.test(name);

export const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const validatePhone = (phone) =>
  /^[0-9]{10}$/.test(phone);

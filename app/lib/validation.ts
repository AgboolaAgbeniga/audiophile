export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name.trim()) && name.trim().length >= 2;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateAddress = (address: string): boolean => {
  return address.trim().length >= 5;
};

export const validateCity = (city: string): boolean => {
  const cityRegex = /^[a-zA-Z\s]+$/;
  return cityRegex.test(city.trim()) && city.trim().length >= 2;
};

export const validateZip = (zip: string): boolean => {
  const zipRegex = /^[a-zA-Z0-9\s\-]+$/;
  return zipRegex.test(zip.trim()) && zip.trim().length >= 3;
};

export const validateCountry = (country: string): boolean => {
  const countryRegex = /^[a-zA-Z\s]+$/;
  return countryRegex.test(country.trim()) && country.trim().length >= 2;
};

export const validateEMoneyNumber = (number: string): boolean => {
  const numberRegex = /^\d{9}$/;
  return numberRegex.test(number.replace(/\s/g, ''));
};

export const validateEMoneyPin = (pin: string): boolean => {
  const pinRegex = /^\d{4}$/;
  return pinRegex.test(pin);
};
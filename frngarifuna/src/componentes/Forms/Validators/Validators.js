export const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
export const emptyRegex = /^\s?$/;
export const creditRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
export const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8})\S$/;
export const nameRegex = /^\s?[a-zA-Záóíúé]{2,}([- ][a-zA-Záóíúé]{2,}){1,3}\s?$/;
export const longStringRegex = /^[a-zA-Záóíúé0-9]{3,}(\s{0,1}[a-zA-Záóíúé0-9]{0,}){0,}$/;
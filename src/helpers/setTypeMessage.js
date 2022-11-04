import alertify from "alertifyjs";
export const setTypeMessage = (type, message) => {
  const methods = {
    success: () => alertify.success(message),
    warning: () => alertify.warning(message),
    error: () => alertify.error(message),
  };

  return methods[type];
};

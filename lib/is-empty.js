// This function check if any keys are present in the object
export const isEmpty = (obj) => {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

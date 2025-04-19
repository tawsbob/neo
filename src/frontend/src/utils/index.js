
export const isString = (value) => typeof value === "string";
export const isObject = (value) => typeof value === "object" && value !== null;
export const isNumber = (value) => typeof value === "number";

export function empty(data) {
  if (Array.isArray(data)) {
    return data.length === 0;
  }

  if (isObject(data)) {
    return Object.keys(data).length === 0;
  }

  if (isString(data)) {
    return data === "";
  }

  if (isNumber(data)) {
    return data === 0;
  }

  return data === null || data === undefined;
}

export function notEmpty(type) {
  return !empty(type);
}

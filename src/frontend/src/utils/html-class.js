import { isString, isObject } from "@/utils";

export function withTypes(types = "") {
  return types ? types.split(/\s/g) : [];
}

export function toggle(condition, selector) {
  return {
    condition,
    selector,
  };
}

export function styler(stl) {
  return (...selectors) => {
    return selectors
      .reduce((acc, sel) => {
        if (isString(sel)) {
          acc.push(stl[sel] || sel);
        }

        if (isObject(sel)) {
          const { condition, selector } = sel;

          if (condition) {
            acc.push(stl[selector] || selector);
          }
        }

        return acc;
      }, [])
      .join(" ")
      .trim();
  };
}

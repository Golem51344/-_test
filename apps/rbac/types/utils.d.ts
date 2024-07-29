type ConditionalExceptType<T extends Record<PropertyKey, any>, Type> = {
  [P in keyof T]: Exclude<T[P], Type>
};

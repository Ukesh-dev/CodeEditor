export const bundleReducer = (
  state: { data: string } = { data: "hello" },
  action: { type: "hello" }
) => {
  if (action.type === "hello") {
    return state;
  }
  return state;
};

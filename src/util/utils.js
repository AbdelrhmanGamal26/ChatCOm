export const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export function changeTimeFormat() {
  let date = new Date();
  return date.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

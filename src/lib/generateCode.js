// src/lib/generateCode.js
export function makeCode(len = 5) {
  return Math.random().toString(36).substring(2, 2 + len).toUpperCase();
}

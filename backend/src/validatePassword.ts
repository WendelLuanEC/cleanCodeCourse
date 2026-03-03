export function validatepassword(password: string) {
  if (password.length < 8) return false;
  if (!password.match(/[0-9]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/[A-Z]/)) return false;
  return true;
}
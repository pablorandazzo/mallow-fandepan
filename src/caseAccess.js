// Academic presentation gate, explicitly client-side, NOT authentication.
// The password is intentionally readable in the frontend at the user's request.
export const CASE_ACCESS_PASSWORD = "fce2026";
export const CASE_ACCESS_STORAGE_KEY = "mallow.caseAccess";

export function hasCaseAccess() {
  try {
    return window.sessionStorage.getItem(CASE_ACCESS_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

export function grantCaseAccess() {
  try {
    window.sessionStorage.setItem(CASE_ACCESS_STORAGE_KEY, "granted");
    return true;
  } catch {
    return false;
  }
}

export function clearCaseAccess() {
  try {
    window.sessionStorage.removeItem(CASE_ACCESS_STORAGE_KEY);
  } finally {
    window.location.assign("/caso-fan-de-pan");
  }
}

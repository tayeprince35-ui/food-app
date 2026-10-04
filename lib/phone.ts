import {
    parsePhoneNumberFromString,
    type CountryCode,
} from "libphonenumber-js/min";

/**
 * Returns the number in international format (e.g. +2348012345678),
 * or null if it is not a valid number for that country.
 * Accepts "0801 234 5678", "+234 801 234 5678", "8012345678" for NG.
 */
export function normalizePhone(input: string, country?: string): string | null {
  try {
    const code: CountryCode =
      country && /^[A-Za-z]{2}$/.test(country)
        ? (country.toUpperCase() as CountryCode)
        : "NG";
    const parsed = parsePhoneNumberFromString(
      input.replace(/[\s()-]/g, ""),
      code,
    );
    return parsed && parsed.isValid() ? parsed.number : null;
  } catch {
    return null;
  }
}

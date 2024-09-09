'use server'
import { UAParser } from 'ua-parser-js'

export const isMobileDevice = (userAgent: string) => {
  const parser = new UAParser(userAgent);
  return parser.getDevice().type === "mobile";
}

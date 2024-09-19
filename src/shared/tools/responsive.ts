'use server'
import { UAParser } from 'ua-parser-js'

export const isMobileDevice = (userAgent: string) => {
  const parser = new UAParser(userAgent);
  const result = parser.getResult()
  return {
    isMobileDevice:parser.getDevice().type === "mobile",
    deviceType :(result.device && result.device.type) || 'desktop'
  };
}

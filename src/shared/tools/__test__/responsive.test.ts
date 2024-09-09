// isMobileDevice.test.ts

import {
  expect,
  jest,
  describe,
  beforeEach,
  it,
} from "@jest/globals";
import { isMobileDevice } from '../responsive';

describe('isMobileDevice', () => {
  it('должен возвращать значение true, когда user-agent указывает на мобильное устройство', () => {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15A372 Safari/604.1';
    const result = isMobileDevice(userAgent);
    expect(result).toBe(true);
  });

  it('должен возвращать false, когда user-agent указывает на немобильное устройство', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    const result = isMobileDevice(userAgent);
    expect(result).toBe(false);
  });

  it('должен возвращать false, если не указан пользовательский агент', () => {
    const userAgent = null;
    const result = isMobileDevice(userAgent);
    expect(result).toBe(false);
  });
});
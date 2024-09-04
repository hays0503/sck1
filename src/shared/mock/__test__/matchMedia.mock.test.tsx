import React, { useEffect, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@/shared/mock/matchMedia.mock'; // Убедитесь, что путь к mock файлу верный
import {jest, describe} from '@jest/globals';
import { afterEach, beforeEach, test, expect,it } from "@jest/globals";

const ResponsiveComponent = () => {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 600px)');
    const handleChange = () => setIsWide(mediaQuery.matches);
    
    handleChange(); // Initial check
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return <div>{isWide ? 'Wide Screen' : 'Narrow Screen'}</div>;
};

describe('ResponsiveComponent', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    window.matchMedia.mockImplementation(query => ({
      matches: query === '(min-width: 600px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));
  });

  it('should render "Wide Screen" when screen width is at least 600px', () => {
    // No need to re-define mock implementation here
    render(<ResponsiveComponent />);
    expect(screen.getByText('Wide Screen')).toBeInTheDocument();
  });

  it('should render "Narrow Screen" when screen width is less than 600px', () => {
    // Override mock implementation for this specific test
    window.matchMedia.mockImplementation(query => ({
      matches: query !== '(min-width: 600px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }));

    render(<ResponsiveComponent />);
    expect(screen.getByText('Narrow Screen')).toBeInTheDocument();
  });
});

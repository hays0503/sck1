import { render, screen } from '@testing-library/react';
import React from 'react';
import { CityProvider, useGetCityParams } from '../useGetCityParams';

describe('CityProvider and useGetCityParams', () => {
  const TestComponent: React.FC = () => {
    const city = useGetCityParams();
    return <div>{city}</div>;
  };

  test('should provide city value to children', () => {
    render(
      <CityProvider City="New York">
        <TestComponent />
      </CityProvider>
    );

    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  test('should throw error if useGetCityParams is called outside CityProvider', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {}); // To suppress error in test output

    expect(() => render(<TestComponent />)).toThrow(
      'useGetCityParams must be used within a CityProvider'
    );

    consoleError.mockRestore(); // Restore original console.error
  });
});

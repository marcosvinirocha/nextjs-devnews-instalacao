import { render, screen } from '@testing-library/react';
import { Header } from '.';
import React from 'react';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/',
      };
    },
  };
});

describe('Header component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Posts')).toBeInTheDocument();
    expect(getByAltText('Devnews')).toBeInTheDocument();
  });
});

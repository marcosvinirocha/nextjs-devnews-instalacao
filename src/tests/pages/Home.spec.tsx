import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';
import React from 'react';

describe('Home page', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText, debug } = render(<Home />);

    screen.logTestingPlaygroundURL();

    debug();

    expect(getByText('Olá Dev!')).toBeInTheDocument();
    expect(getByAltText('home image')).toBeInTheDocument();
  });
});

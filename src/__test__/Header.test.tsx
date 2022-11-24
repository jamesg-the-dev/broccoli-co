import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { brandName } from '../constants';

test('header contains brand name', () => {
  render(<Header />);
  expect(screen.getByTestId('header')).toHaveTextContent(brandName)
});

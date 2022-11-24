import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingBanner from '../LandingBanner';
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('banner contains h1', () => {
  render(<LandingBanner />);
  expect(screen.getByTestId('banner-title')).toBeInTheDocument()
});

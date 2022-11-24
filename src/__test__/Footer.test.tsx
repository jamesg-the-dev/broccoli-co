import React from 'react';
import { render, screen } from '@testing-library/react';
import { brandName } from '../constants';
import Footer from '../Footer';

test('footer contains brand name', () => {
  render(<Footer />);
  expect(screen.getByTestId('footer')).toHaveTextContent(brandName)
});

test('footer contains social media icons', () => {
  render(<Footer />);
  const twitterIcon = screen.getByTestId('twitter-icon') as HTMLImageElement;
  const instagramIcon = screen.getByTestId('instagram-icon') as HTMLImageElement;
  expect(twitterIcon.alt).toContain('Twitter Icon');
  expect(instagramIcon.alt).toContain('Instagram Icon');
})

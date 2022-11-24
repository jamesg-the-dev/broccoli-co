import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from '../Modal';

beforeEach(() => {
  render(
    <Modal color='#FFFFFF' show={true} close={() => { }}>
      <h1>render sample test child</h1>
    </Modal>
  );
})
test('modal should render with h1', () => {
  expect(screen.getByTestId('modal-container')).toContainHTML('h1')
});



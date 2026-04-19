import { render, screen } from '@testing-library/react';
import App from './App';

test('renders terminal application', () => {
  render(<App />);
  const terminal = screen.getByRole('application');
  expect(terminal).toBeInTheDocument();
});

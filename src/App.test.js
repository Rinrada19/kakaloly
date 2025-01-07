import { render, screen } from '@testing-library/react';
import App from './App';
import Summary_page from './pages/summary_page/Summary_page'

test('renders learn react link', () => {
  render(<Summary_page />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

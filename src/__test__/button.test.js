import React from 'react';
import ButtonLoading from 'components/ButtonLoading';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(cleanup);
it('renders okay', () => {
  render(<ButtonLoading text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toBeInTheDocument();
});

it('shows text when not loading', () => {
  render(<ButtonLoading text='hola' loading={false} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toHaveTextContent('hola');
});

it('doesnt show text when loading', () => {
  render(<ButtonLoading text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveTextContent('hola');
});

it('shows loading component when loading', () => {
  render(<ButtonLoading text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('loading-in-button')).toBeInTheDocument();
});

it('is disabled when prop is passed', () => {
  render(<ButtonLoading text='hola' loading={true} disabled={true} />);
  expect(screen.getByTestId('button-loading')).toHaveAttribute('disabled');
});

it('is enabled when disabled prop is passed as false', () => {
  render(<ButtonLoading text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).not.toHaveAttribute('disabled');
});

it('loads the svg html when loading is activated', () => {
  render(<ButtonLoading text='hola' loading={true} disabled={false} />);
  expect(screen.getByTestId('button-loading')).toMatchSnapshot();
});

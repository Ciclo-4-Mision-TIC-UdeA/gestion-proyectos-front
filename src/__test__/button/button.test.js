import React from 'react';
import ButtonLoading from 'components/ButtonLoading';
import { render, cleanup, screen } from '@testing-library/react';

afterEach(cleanup);
it('renders okay', () => {
  render(<ButtonLoading loading={false} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).toBeInTheDocument();
});

it('renders button correctly without loading', () => {
  render(<ButtonLoading loading={false} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).toHaveTextContent('Hola');
});

it('renders button correctly with loading', () => {
  render(<ButtonLoading loading={true} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).not.toHaveTextContent('Hola');
});

it('renders button correctly disabled', () => {
  render(<ButtonLoading disabled={true} loading={false} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).toHaveAttribute('disabled');
});

it('renders button correctly enabled', () => {
  render(<ButtonLoading disabled={false} loading={false} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).not.toHaveAttribute('disabled');
});

it('renders loading', () => {
  render(<ButtonLoading loading={true} disabled={false} text={'Hola'} />);
  expect(screen.getByTestId('button-loading-test')).toBeInTheDocument();
});

it('renders svg when loading is activated', () => {
  render(<ButtonLoading disabled={false} loading={true} text={'Hola'} />);
  expect(screen.getByTestId('button-test')).toMatchSnapshot();
});

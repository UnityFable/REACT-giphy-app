import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MyCounterApp } from './MyCounterApp';

describe('MyCounterApp', () => {
  test('Should render the component with default values', () => {
    render(<MyCounterApp />);

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(`Counter: 5`);

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined();
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined();
  });

  test('Should increment the counter', () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole('heading', { level: 1 });
    const buttonAdd = screen.getByRole('button', {name: '+1'});

    fireEvent.click(buttonAdd);

    expect(labelH1.innerHTML).toContain(`Counter: 6`);
  });

  test('Should decrement the counter', () => {
    render(<MyCounterApp />);

    const labelH1 = screen.getByRole('heading', { level: 1 });
    const buttonSubtract = screen.getByRole('button', {name: '-1'});

    fireEvent.click(buttonSubtract);

    expect(labelH1.innerHTML).toContain(`Counter: 4`);
  });
});
import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {
  test('Should render the title correctly', () => {
    const title = 'Buscador de gifs';
    render(<CustomHeader title={title} />);

    expect(screen.getByText(title)).toBeDefined();
  });

  test('Should render the description when provided', () => {
    const description = 'Descubre y comparte el Gif perfecto';
    render(<CustomHeader title='' description={description} />);

    expect(screen.getByText(description)).not.toBeNull();
    expect(screen.getByRole('paragraph')).toBeDefined();
    expect(screen.getByRole('paragraph').innerHTML).toBe(description);
  });

  test('Should not render the description when not provided', () => {
    const { container } = render(<CustomHeader title='' />);

    const divElement = container.querySelector('content-center');
    const p = divElement?.querySelector('p');

    expect(container.getElementsByTagName('p').length).toBe(0);
    expect(p).toBeUndefined();
    expect(p).not.toBeDefined();
  });
});
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  test('Should render the component with default values', () => {
    const { container } = render(<SearchBar onQuery={() => { }} />);

    expect(container).toMatchSnapshot();
  });

  test('Should call onQuery with the correct value after 700ms', async () => {
    const onQuery = vi.fn();
    const query = 'goku';
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: query } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith(query);
    });
  });

  test('Should call onQuery only once with the las value (debounce)', async () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith('test');
    });
  });

  test('Should call onQuery when button clicked whit the input value', () => {
    const onQuery = vi.fn();
    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'goku' } });

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(onQuery).toHaveBeenCalledTimes(1);
    expect(onQuery).toHaveBeenCalledWith('goku');
  });

  test('Should the input has the correct placeholder value', () => {
    const placeholder = 'Buscar gif';
    render(<SearchBar onQuery={() => { }} placeHolder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeDefined();
  });
});
import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCounter } from './useCounter';

describe('UseCounter', () => {
  test('Should initialize with default value of 10', () => {
    const { result } = renderHook(useCounter);

    expect(result.current.counter).toBe(10);
  });

  test('Should initialize with custom value', () => {
    const initialValue = 20;
    const { result } = renderHook(() => useCounter(initialValue));

    expect(result.current.counter).toBe(initialValue);
  });

  test('Should increment counter when handleAdd is called', () => {
    const { result } = renderHook(useCounter);
    act(() => {
      result.current.handleAdd();
    });

    expect(result.current.counter).toBe(11);
  });

  test('Should decrement counter when handleSubtract is called', () => {
    const { result } = renderHook(useCounter);
    act(() => {
      result.current.handleSubtract();
    });

    expect(result.current.counter).toBe(9);
  });

  test('Should reset counter when handleReset is called', () => {
    const { result } = renderHook(useCounter);
    act(() => {
      result.current.handleAdd();
    });
    expect(result.current.counter).toBe(11);
    act(() => {
      result.current.handleReset();
    });

    expect(result.current.counter).toBe(10);
  });
});
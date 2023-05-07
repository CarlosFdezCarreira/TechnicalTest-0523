import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputNumber from './InputNumber';

describe('InputNumber', () => {
  const onChangeMock = jest.fn();

  test('displays the correct initial value', () => {
    const { getByDisplayValue } = render(<InputNumber value={5} onChange={onChangeMock} />);
    expect(getByDisplayValue('5')).toBeInTheDocument();
  });

  test('calls onChange function when input value changes', () => {
    const { getByDisplayValue } = render(<InputNumber value={10} onChange={onChangeMock} />);
    const input = getByDisplayValue('10');
    fireEvent.change(input, { target: { value: '15' } });
    expect(onChangeMock).toBeCalled();
  });

  test('disables the input when disabled prop is true', () => {
    const { getByDisplayValue } = render(<InputNumber value={0} onChange={onChangeMock} disabled />);
    const input = getByDisplayValue('0');
    expect(input).toBeDisabled();
  });
});

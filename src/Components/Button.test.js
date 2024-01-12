import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button'; 

describe('Button Component', () => {
  test('renders button with correct label', () => {
    const label = 'Click me';
    const { getByText } = render(<Button label={label} />);

    const button = getByText(label);
    expect(button).toBeInTheDocument();
  });

  test('calls onClick prop when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<Button label="Click me" onClick={onClickMock} />);

    const button = getByText('Click me');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('applies custom style to button', () => {
    const { container } = render(<Button label="Test Button" />);
    const button = container.querySelector('button');

    expect(button).toHaveClass('custom-button');
  });
});

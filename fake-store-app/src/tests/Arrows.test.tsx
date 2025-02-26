import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextArrow, PrevArrow } from '../components/Arrows';

describe('Arrows Component', () => {
  test('NextArrow renderiza a seta para a direita e dispara onClick', () => {
    const onClickMock = jest.fn();
    render(<NextArrow onClick={onClickMock} />);
    

    const arrowElement = screen.getByText('▶');
    expect(arrowElement).toBeInTheDocument();

    fireEvent.click(arrowElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('PrevArrow renderiza a seta para a esquerda e dispara onClick', () => {
    const onClickMock = jest.fn();
    render(<PrevArrow onClick={onClickMock} />);
    

    const arrowElement = screen.getByText('◀');
    expect(arrowElement).toBeInTheDocument();

    fireEvent.click(arrowElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

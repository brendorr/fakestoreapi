import React from 'react';

interface ArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="custom-arrow custom-next" onClick={onClick}>
    &#9654; {/* seta para a direita */}
  </div>
);

export const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <div className="custom-arrow custom-prev" onClick={onClick}>
    &#9664; {/* seta para a esquerda */}
  </div>
);

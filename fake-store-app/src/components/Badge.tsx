import React from 'react';

interface BadgeProps {
  label: string;
  color?: string;
}

const Badge: React.FC<BadgeProps> = ({ label, color = "#ffd700" }) => {
  return (
    <div 
      className="badge" 
      style={{ backgroundColor: color }}
    >
      ⭐ {label}
    </div>
  );
};

export default Badge;
"use client"

import React from 'react';
import { Button as MaterialButton, ButtonProps } from '@material-tailwind/react';

type CustomSize = 'icon';

interface MaterialButtonComponentProps {
  variant?: ButtonProps['variant'] | 'ghost';
  size?: ButtonProps['size'] | CustomSize;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  placeholder?: string;
}

const Button: React.FC<MaterialButtonComponentProps> = ({
  variant,
  size,
  className,
  onClick,
  children,
  ...rest
}) => {
  const buttonClasses = `${className ?? ''} ${
    variant === 'ghost' ? 'bg-transparent text-primary border-primary' : ''
  } ${size === 'icon' ? 'p-2 min-w-0' : ''}`;
  return (
    <MaterialButton
      onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} placeholder={undefined} variant={variant === 'ghost' ? 'outlined' : variant}
      size={size !== 'icon' ? size : undefined}
      className={buttonClasses}
      onClick={onClick}
      {...rest}>
        Hello
    </MaterialButton>
  );
};

export default Button;

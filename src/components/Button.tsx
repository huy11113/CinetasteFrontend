// src/components/Button.tsx
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BaseButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

type ButtonAsButton = BaseButtonProps & {
  as?: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: never;
};

type ButtonAsLink = BaseButtonProps & {
  as: 'link';
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button(props: ButtonProps) {
  const { 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
  } = props;

  const baseStyles = 'font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-cinematic-accent text-white hover:bg-cinematic-accent-light hover:shadow-glow-red transform hover:scale-105',
    secondary: 'bg-cinematic-gray-light text-white hover:bg-cinematic-gray border border-gray-700',
    outline: 'bg-transparent text-cinematic-accent border-2 border-cinematic-accent hover:bg-cinematic-accent hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const appliedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === 'link') {
    return (
      <Link to={props.href} className={appliedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={props.disabled || false}
      className={appliedClasses}
    >
      {children}
    </button>
  );
}
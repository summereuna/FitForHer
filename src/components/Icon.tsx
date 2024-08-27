interface IconProps {
  children: React.ReactNode;
  className: string;
}

export function Icon({ children, className }: IconProps) {
  return <div className={className}>{children}</div>;
}

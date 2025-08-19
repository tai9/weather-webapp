import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Card = ({ className, children }: Props) => {
  return (
    <div className={`bg-white rounded-xl shadow-xl p-4 flex flex-col gap-4 items-start ${className}`}>{children}</div>
  );
};

export default Card;

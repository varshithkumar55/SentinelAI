function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-surface
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
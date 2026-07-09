import { LoaderCircle } from "lucide-react";

const variants = {
  primary:
    "bg-blue-900 text-white hover:bg-blue-800",
  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300",
  outline:
    "border border-blue-900 text-blue-900 hover:bg-blue-50",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

function Button({
  children,
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl px-5 py-3
        font-medium
        transition-all duration-200
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <LoaderCircle className="h-5 w-5 animate-spin" />
      ) : (
        icon
      )}

      {children}
    </button>
  );
}

export default Button;
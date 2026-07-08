export default function Button({
  children,
  variant = "primary",
  className = "",
  as: Comp = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-body font-semibold rounded-full px-6 py-3 text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-terracotta disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:
      "bg-gradient-to-r from-terracotta to-gold text-navy shadow-soft hover:shadow-glow hover:-translate-y-0.5",
    secondary:
      "bg-royal/8 text-royal border border-royal/30 hover:bg-royal/14 hover:border-royal/50",
    ghost: "text-navy/70 hover:text-terracotta",
    outline: "border border-terracotta/50 text-terracotta hover:bg-terracotta/10",
  };
  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        background: "transparent",
        color: "inherit",
        border: "1px solid currentColor",
        borderRadius: "8px",
        padding: "0.5rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

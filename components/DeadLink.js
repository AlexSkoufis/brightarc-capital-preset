"use client";

// Navigation items for pages that do not exist yet: focusable and styled like links, but they stay on the page.
export default function DeadLink({ children, onClick, ...props }) {
  return (
    <a
      href="#"
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

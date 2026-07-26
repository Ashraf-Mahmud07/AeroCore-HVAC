/** First tab stop on every page — jumps past the fixed header into the content. */
export function SkipLink() {
  return (
    <a href="#main" className="ac-skip-link">
      Skip to content
    </a>
  );
}

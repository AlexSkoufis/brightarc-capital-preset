// Lets any CTA on the page preselect the "What are you looking for?" field in the contact form.
export const NEED_EVENT = "brightarc:need";

export function selectNeed(need) {
  if (!need || typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(NEED_EVENT, { detail: need }));
}

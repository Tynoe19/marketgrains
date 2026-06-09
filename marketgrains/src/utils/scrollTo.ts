/**
 * Smoothly scrolls the page to a section by its HTML id.
 * We use getElementById + scrollIntoView instead of hash links (#products)
 * so we can close the mobile menu and control behavior from React.
 */
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

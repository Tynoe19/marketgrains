import { useNavigate, useLocation } from "react-router-dom";
import { scrollToSection } from "./scrollTo";

export type HomeSectionId =
  | "products"
  | "packages"
  | "distributors"
  | "contact";

/**
 * When you're on the home page, scroll to a section.
 * When you're on another page, navigate home first, then scroll.
 */
export function useNavigateToHomeSection() {
  const navigate = useNavigate();
  const location = useLocation();

  return (sectionId: HomeSectionId) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };
}

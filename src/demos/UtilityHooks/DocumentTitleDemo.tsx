import { useDocumentTitle } from "../../hooks/UtilityHooks/useDocumentTitle";

export function DocumentTitleDemo() {
  useDocumentTitle("Document Title Hook");

  return <h2>Check your browser tab!</h2>;
}

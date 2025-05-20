import { ReactNode, useState } from "react";
import AccessDeniedPage from "./AcessDenied";

function AccessProtector({ children }: { children: ReactNode }) {
  const [isAllowed, setIsAllowed] = useState(false);
  return (
    <>
      {isAllowed ? (
        <div>{children}</div>
      ) : (
        <AccessDeniedPage setIsAllowed={setIsAllowed} />
      )}
    </>
  );
}

export default AccessProtector;

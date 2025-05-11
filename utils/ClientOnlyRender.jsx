import { useEffect, useState } from "react";

export default function ClientOnlyRender({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : null;
}

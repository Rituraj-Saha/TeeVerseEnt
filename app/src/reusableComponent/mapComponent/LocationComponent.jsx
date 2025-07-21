import React, { Suspense } from "react";
const UserLocationMapClient = React.lazy(() =>
  import("./UserLocationMapClient")
);

const UserLocationMap = () => {
  if (typeof window === "undefined") {
    // SSR phase: do not render
    return null;
  }

  return (
    <Suspense fallback={<p>Loading map...</p>}>
      <UserLocationMapClient />
    </Suspense>
  );
};

export default UserLocationMap;

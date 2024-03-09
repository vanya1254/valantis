import React from "react";
import ContentLoader from "react-content-loader";

export const Skeletons = () => {
  return (
    <ContentLoader
      speed={3}
      width={300}
      height={400}
      viewBox="0 0 300 400"
      backgroundColor="#ffffff"
      foregroundColor="#bebebe"
    >
      <rect x="32" y="823" rx="0" ry="0" width="226" height="221" />
      <rect x="0" y="0" rx="8" ry="8" width="300" height="400" />
    </ContentLoader>
  );
};

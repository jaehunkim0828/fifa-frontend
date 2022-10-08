import React from "react";
import Nav from "../nav/Nav";
import MobileNotice from "../mobile-notice/MobileNotice";
import Seo from "./Seo";
import { useResize } from "@hooks/useResize";

export interface LayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
  page: string;
  path: string;
}

export default function Layout({
  page,
  isMobile,
  children,
  path,
}: LayoutProps) {
  const size = useResize();

  return (
    <>
      <Seo title={page} path={path} />
      {!isMobile ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            height: `${size.nowHeight}px`,
          }}
        >
          <Nav />
          <>{children}</>
        </div>
      ) : (
        <MobileNotice />
      )}
    </>
  );
}

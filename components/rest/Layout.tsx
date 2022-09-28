import React from "react";
import Nav from "../nav/Nav";
import MobileNotice from "../mobile-notice/MobileNotice";
import Seo from "./Seo";
import useResize from "@hooks/useResize";

export interface LayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
  page: string;
}

export default function Layout({ page, isMobile, children }: LayoutProps) {
  const windowWidth = useResize();

  return (
    <>
      <Seo title={page} />
      {!isMobile ? (
        <div
          style={{
            width: windowWidth <= 1248 && !isMobile ? "1248px" : "100%",
            display: "flex",
            flexDirection: "column",
            height: "100%",
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

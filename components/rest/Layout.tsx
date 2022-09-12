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

  const structure = {
    width: windowWidth <= 1248 && !isMobile ? "1248px" : "100%",
    height: "95%",
  };

  return (
    <>
      <Seo title={page} />
      {!isMobile ? (
        <div style={structure}>
          <Nav />
          <>{children}</>
        </div>
      ) : (
        <MobileNotice />
      )}
    </>
  );
}

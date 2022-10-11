import React from "react";
import Nav from "../nav/Nav";
import MobileNotice from "../mobile-notice/MobileNotice";
import Seo from "./Seo";
import { useResize } from "@hooks/useResize";
import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import("./ProgressBar"), {
  ssr: false,
});

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
            height: `100%`,
          }}
        >
          <Nav />
          <ProgressBar />
          <>{children}</>
        </div>
      ) : (
        <MobileNotice />
      )}
    </>
  );
}

import React from "react";
import Nav from "../nav/Nav";
import Seo from "./Seo";
import dynamic from "next/dynamic";

const ProgressBar = dynamic(() => import("./ProgressBar"), {
  ssr: false,
});

export interface LayoutProps {
  children: React.ReactNode;
  page: string;
  path: string;
}

export default function Layout({ page, children, path }: LayoutProps) {
  return (
    <>
      <Seo title={page} path={path} />
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
    </>
  );
}

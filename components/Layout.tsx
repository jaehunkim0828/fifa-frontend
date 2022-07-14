import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import Nav from "./Nav";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
}

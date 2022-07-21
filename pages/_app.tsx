import "../styles/globals.css";
import type { AppProps } from "next/app";

import Nav from "../components/nav/Nav";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="main">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;

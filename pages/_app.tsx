import App, { AppContext, AppProps } from "next/app";

import "../styles/globals.css";
import { wrapper } from "../store";
import "../styles/globals.css";
import Inquiry from "@components/inquiry/Inquiry";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="main">
      <Component {...pageProps} />
      <Inquiry />
    </div>
  );
}

export default wrapper.withRedux(MyApp);

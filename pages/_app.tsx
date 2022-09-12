import App, { AppContext, AppProps } from "next/app";

import "../styles/globals.css";
import { wrapper } from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="main">
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  //userAgent
  const userAgent = appContext.ctx.req
    ? appContext.ctx.req?.headers["user-agent"]
    : navigator.userAgent;

  //Mobile
  const mobile = userAgent?.indexOf("Mobi");

  //Mobile in pageProps
  appProps.pageProps.isMobile = mobile !== -1 ? true : false;

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);

import "antd/dist/antd.css";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import "../styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PiJukebox</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;

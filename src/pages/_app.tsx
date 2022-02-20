import { AppProps } from 'next/app';
import '../styles/globals.scss';
import Head from 'next/head';
import { PrismicProvider } from "@prismicio/react";

import { linkResolver } from "../utils/linkResolver";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
  <>
    {/* <PrismicProvider linkResolver={linkResolver}> */}
    <Head>
      <title>spacetravelling.</title>
    </Head>
    <Component {...pageProps} />
    {/* </PrismicProvider> */}
  </>
  )
}

export default MyApp;

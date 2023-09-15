import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  createStyles,
  rem,
} from '@mantine/core';
import 'modern-css-reset/dist/reset.min.css';
import { RiBook3Line } from 'react-icons/ri';
import { SiZenn, SiQiita } from 'react-icons/si';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import {
  default as Header,
  LayoutHeaderProps as HeaderProps,
} from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';
import Script from 'next/script';
import * as gtag from '@/lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useStyles = createStyles((theme) => ({
  main: {
    marginTop: rem(57),
    minHeight: '80vh',
  },
}));

function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const { classes } = useStyles();
  const router = useRouter();

  const linksProps: HeaderProps = {
    links: [
      { link: '/', label: 'Home' },
      { link: '/profile', label: 'Profile' },
      { link: '/works', label: 'Works' },
      { link: '/contact', label: 'Contact' },
      {
        link: '',
        label: 'Blog',
        links: [
          { link: 'https://zenn.dev/hekuchandao', label: 'Zenn', icon: SiZenn },
          { link: 'https://qiita.com/hekuta', label: 'Qiita', icon: SiQiita },
          {
            link: 'https://docs.hekuta.net/',
            label: 'VTA Python Books',
            icon: RiBook3Line,
          },
        ],
      },
    ],
  };

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  useEffect(() => {
    const handleRouterChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouterChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);

  return (
    <>
      <Script src="https://sdk.form.run/js/v2/formrun.js" />
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <Header links={linksProps.links} />
          <main className={classes.main}>
            <Component {...pageProps} />
            <PrismicPreview repositoryName={repositoryName} />
          </main>
          <Footer />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);

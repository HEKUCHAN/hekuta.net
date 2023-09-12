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
const useStyles = createStyles((theme) => ({
  main: {
    marginTop: rem(57),
  },
}));

import { PrismicPreview } from '@prismicio/next';
import { repositoryName } from '@/prismicio';

function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });
  const { classes } = useStyles();

  const linksProps: HeaderProps = {
    links: [
      { link: '/', label: 'Home' },
      { link: '/profile', label: 'Profile' },
      { link: '/works', label: 'Works' },
      { link: '/career', label: 'Career' },
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

  return (
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
  );
}

export default appWithTranslation(App, nextI18NextConfig);

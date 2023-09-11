import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import "modern-css-reset/dist/reset.min.css";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import LayoutHeader, { LayoutHeaderProps } from "@/components/layouts/Header";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const linksProps: LayoutHeaderProps = {
    links: [
      { link: "/", label: "Home" },
      { link: "/#about", label: "About" },
      { link: "/#works", label: "Works" },
      { link: "/#career", label: "Career" },
      { link: "/#contact", label: "Contact" },
      {
        link: "",
        label: "Blog",
        links: [
          { link: "https://zenn.dev/hekuchandao", label: "Zenn" },
          { link: "https://qiita.com/hekuta", label: "Qiita" },
          { link: "https://docs.hekuta.net/", label: "VTA Python Books" },
        ],
      },
    ],
  };

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <LayoutHeader links={linksProps.links} />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

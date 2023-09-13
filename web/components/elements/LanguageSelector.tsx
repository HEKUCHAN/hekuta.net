import { useEffect, useState } from 'react';
import { createStyles, UnstyledButton, Menu, Group, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import nextI18NextConfig from '@/next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

type LanguageType = {
  label: string;
  value: string;
  flag: string;
};

const languages: LanguageType[] = [
  { label: 'Japanese', value: 'ja', flag: 'JP' },
  { label: 'English', value: 'en', flag: 'US' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: rem(200),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const selected_lang = await serverSideTranslations(
    locale ?? 'ja',
    ['common'],
    nextI18NextConfig,
  );
  console.log(selected_lang);

  return {
    props: {
      locale: selected_lang,
    },
  };
};

export default function LanguageSelector({ selected_lang }) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState<LanguageType>(languages[0]);
  const router = useRouter();

  const searchSelectedLanguage = (
    selected_lang: string,
    languages: LanguageType[],
  ) => {
    languages.map((lang) => {
      if (lang.value === selected_lang) {
        console.log(lang);
        return lang;
      }
    });
    return languages[0];
  };

  const handleLanguageChange = (selectedLanguage: LanguageType) => {
    setSelected(selectedLanguage);
    i18n.changeLanguage(selectedLanguage.value);
    setOpened(false);

    router.push(router.pathname, undefined, { locale: selectedLanguage.value });
  };

  useEffect(() => {
    const currentLanguage = searchSelectedLanguage(i18n.language, languages);
    setSelected(currentLanguage);
  }, [i18n]);

  const items = languages.map((item) => (
    <Menu.Item onClick={() => handleLanguageChange(item)} key={item.label}>
      <Group>
        <ReactCountryFlag
          svg
          countryCode={item.flag}
          style={{
            fontSize: '12px',
            lineHeight: '12px',
          }}
          aria-label={item.label}
        />
        {item.label}
      </Group>
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group>
            <ReactCountryFlag
              svg
              countryCode={selected.flag}
              style={{
                fontSize: '12px',
                lineHeight: '12px',
              }}
              aria-label={selected.label}
            />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

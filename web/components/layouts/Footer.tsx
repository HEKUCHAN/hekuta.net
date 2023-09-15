import { createStyles, Container, Group, rem } from '@mantine/core';
import SocialBottoms from '@/components/elements/SocialBottoms';
import LanguageSelector from '../elements/LanguageSelector';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
      marginBottom: theme.spacing.md,
    },
  },

  privacyPolicy: {
    textDecoration: 'none',
    fontSize: rem(12),
    color: 'inherit',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function Footer() {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <div>
          <Link href="/privacy-policy" className={classes.privacyPolicy}>
            {t('policy_title')}
          </Link>
          <p>© 2023 Heitor Hirose. All rights reserved.</p>
        </div>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <SocialBottoms />
        </Group>
        <LanguageSelector />
      </Container>
    </div>
  );
}

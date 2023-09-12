import { createStyles, Container, Group, ActionIcon, rem } from '@mantine/core';
import SocialBottoms from '@/components/elements/SocialBottoms';
import LanguageSelector from '../elements/LanguageSelector';

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
}));

export default function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <p>© 2023 Heitor Hirose. All rights reserved.</p>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <SocialBottoms />
        </Group>
        <LanguageSelector />
      </Container>
    </div>
  );
}

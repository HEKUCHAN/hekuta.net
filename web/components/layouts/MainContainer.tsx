import { createStyles, rem } from '@mantine/core';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    maxWidth: rem(928),
    width: '100%',
    margin: '0 auto',
    padding: `${rem(20)} ${rem(15)}`,
  },
}));

interface Props {
  children: ReactNode;
}

export default function MainContainer({ children }: Props) {
  const { classes } = useStyles();
  return <div className={classes.mainContainer}>{children}</div>;
}

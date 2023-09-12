import { createStyles, rem } from '@mantine/core';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  subContainer: {
    padding: rem(26),
  },
}));

interface Props {
  children: ReactNode;
}

export default function SubContainer({ children }: Props) {
  const { classes } = useStyles();
  return <div className={classes.subContainer}>{children}</div>;
}

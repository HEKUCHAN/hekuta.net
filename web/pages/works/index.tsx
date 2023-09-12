import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    maxWidth: rem(928),
    width: '100%',
    margin: '0 auto',
  },
}));

export default function Works() {
  const { classes } = useStyles();

  return (
    <div className={classes.mainContainer}>
      <h1>Works</h1>
    </div>
  );
}

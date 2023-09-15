import MainContainer from '@/components/layouts/MainContainer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@/next-i18next.config.js';
import { createStyles, rem } from '@mantine/core';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
  mainContainer: {
    maxWidth: rem(928),
    width: '100%',
    margin: '0 auto',
  },
  message: {
    padding: rem(25),
    margin: '40px auto',
    textAlign: 'center',
  },
}));

export default function Works() {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <MainContainer>
      <h1>Works</h1>
      <div className={classes.message}>
        <p>{t('works_message')}</p>
      </div>
    </MainContainer>
  );
}

type Props = {
  // Add custom props here
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'ja',
      ['common'],
      nextI18NextConfig,
    )),
  },
});

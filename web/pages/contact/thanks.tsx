import nextI18NextConfig from '@/next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import MainContainer from '@/components/layouts/MainContainer';
import { createStyles } from '@mantine/core';
import Meta from '@/components/Meta';
import { useRouter } from 'next/router';
import Head from 'next/head';

const useStyles = createStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
}));

export default function ContactThanks() {
  const { classes } = useStyles();
  const router = useRouter();
  const { t } = useTranslation(['common']);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Meta siteName="Thanks for contacting" />
      <MainContainer>
        <h1 className={classes.title}>{t('form.thanks')}</h1>
        <p className={classes.message}>{t('form.thanks_message')}</p>
      </MainContainer>
    </>
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

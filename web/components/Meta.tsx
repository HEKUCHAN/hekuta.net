import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import nextI18NextConfig from '../next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

interface MetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
  siteName?: string;
  favicon?: string;
  twitterCard?: string;
  twitterSite?: string;
  lang?: string;
  isHomePage?: boolean;
}

const Meta = ({
  description = '',
  ogImage = '/profile_image.jpg',
  siteName = '',
  favicon = '/favicon.ico',
  twitterCard = 'summary',
  twitterSite = '@Heitor_Hirose',
  lang = 'ja_JP',
  isHomePage = false,
}: MetaProps) => {
  const { t } = useTranslation(['common']);
  const router = useRouter();
  const title = t('name');
  let url = '';
  if (typeof window !== 'undefined') {
    url = `${window.location.origin}${router.asPath}`;
  }
  const pageTitle = isHomePage ? title : `${title} - ${siteName}`;
  const selfIntroduction =
    description === ''
      ? t('self_introduction').replace(/<1\/>/g, '')
      : description;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={selfIntroduction} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={selfIntroduction} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:locale" content={lang} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="shortcut icon" href={favicon} />
      <link rel="icon" href={favicon} />
    </Head>
  );
};

export default Meta;

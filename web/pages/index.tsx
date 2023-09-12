import {
  Avatar,
  BackgroundImage,
  Group,
  Tooltip,
  createStyles,
  em,
  rem,
} from '@mantine/core';
import { Trans, useTranslation } from 'next-i18next';
import { FaLocationDot } from 'react-icons/fa6';
import { TiBusinessCard } from 'react-icons/ti';
import nextI18NextConfig from '../next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router.js';

const useStyles = createStyles((theme) => ({
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    height: rem('100%'),
    alignItems: 'center',
    backdropFilter: 'blur(12px) brightness(0.3)',
    color: '#C1C2C5',
  },
  profileBackground: {
    width: em('100%'),
    height: em('100vh'),
    backgroundPosition: 'top',
  },
  description: {
    padding: `${rem(25)} ${rem(20)}`,
    maxWidth: 420,
  },
}));

type Props = {
  // Add custom props here
};

export default function Index() {
  const router = useRouter();
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <>
      <BackgroundImage
        src="/index_page_background.jpg"
        className={classes.profileBackground}
      >
        <div className={classes.profileContainer}>
          <Tooltip label="Hirose Heitor" withArrow>
            <Avatar src="/profile_image.jpg" size={180} />
          </Tooltip>
          <h1>{t('name')}</h1>
          <Group spacing="xs">
            <FaLocationDot />
            <p>{t('location')}</p>
          </Group>
          <Group spacing="xs">
            <TiBusinessCard />
            <p>{t('role')}</p>
          </Group>
          <p className={classes.description}>
            <Trans i18nKey="self_introduction" components={{ 1: <br /> }} />
          </p>
        </div>
      </BackgroundImage>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'ja',
      ['common'],
      nextI18NextConfig,
    )),
  },
});

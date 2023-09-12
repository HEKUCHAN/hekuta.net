import { Avatar, Group, Stack, createStyles, rem } from '@mantine/core';
import { Trans, useTranslation } from 'next-i18next';
import nextI18NextConfig from '@/next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { FaLocationDot } from 'react-icons/fa6';
import { TiBusinessCard } from 'react-icons/ti';
import MainContainer from '@/components/layouts/MainContainer';
import SubContainer from '@/components/layouts/SubContainer';

const useStyles = createStyles((theme) => ({
  profile: {
    margin: `${rem(25)} 0`,
  },
  profileImage: {
    margin: `${rem(25)}`,
  },
  description: {
    padding: `${rem(25)} ${rem(20)}`,
    maxWidth: 420,
  },
}));

export default function About() {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <MainContainer>
      <h1>Profile</h1>
      <div className={classes.profile}>
        <Group position="center">
          <Avatar
            className={classes.profileImage}
            src="/profile_image.jpg"
            size={180}
            radius="100%"
          />
          <Stack className={classes.description}>
            <p>
              <Trans i18nKey="self_introduction" components={{ 1: <br /> }} />
            </p>
            <Group>
              <Group spacing="xs">
                <FaLocationDot />
                <p>{t('location')}</p>
              </Group>
              <Group spacing="xs">
                <TiBusinessCard />
                <p>{t('role')}</p>
              </Group>
            </Group>
          </Stack>
        </Group>
      </div>

      <SubContainer>
        <h2>Skills</h2>
      </SubContainer>

      <SubContainer>
        <h2>Events</h2>
      </SubContainer>

      <SubContainer>
        <h2>Hackathon</h2>
      </SubContainer>
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
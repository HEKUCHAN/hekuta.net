import Meta from '@/components/Meta';
import nextI18NextConfig from '../next-i18next.config.js';
import MainContainer from '@/components/layouts/MainContainer';
import { Title, createStyles, rem, Group } from '@mantine/core';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  description: {
    padding: `${rem(10)} 0`,
    p: {
      padding: `${rem(10)} 0`,
    },
  },
}));

export default function PrivacyPolicy() {
  const { classes } = useStyles();
  const router = useRouter();
  return (
    <>
      <Meta siteName="PrivacyPolicy" />
      <MainContainer>
        <Title order={1}>Privacy Policy</Title>

        <div className={classes.description}>
          <p>運営者 : 広瀬エイトル</p>
          <p>ドメイン : hekuta.net</p>
        </div>

        <div className={classes.description}>
          <Title order={2}>個人情報の利用目的</Title>
          <p>
            当サイトでは、コメントなどで取得した個人情報は、
            サイトの改善に利用させていただくものであり、これらの目的以外では利用いたしません。
          </p>
        </div>

        <div className={classes.description}>
          <Title order={2}>アクセス解析ツールについて</Title>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </div>

        <div className={classes.description}>
          <h1>免責事項</h1>
          <p>
            当サイトからのリンクやバナーなどで移動したサイトで提供される情報、サービス等について一切の責任を負いません。
            また当サイトのコンテンツ・情報について、できる限り正確な情報を提供するように努めておりますが、正確性や安全性を保証するものではありません。情報が古くなっていることもございます。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
        </div>

        <div className={classes.description}>
          <Title order={2}>リンクについて</Title>
          <p>
            当サイトは基本的にリンクフリーです。リンクを行う場合の許可や連絡は不要です。
            ただし、インラインフレームの使用や画像の直リンクはご遠慮ください。
          </p>
        </div>
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

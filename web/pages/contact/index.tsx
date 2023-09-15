import MainContainer from '@/components/layouts/MainContainer';
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import nextI18NextConfig from '@/next-i18next.config.js';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

export default function Contact() {
  const { t } = useTranslation(['common']);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <>
      <MainContainer>
        <form
          className="formrun"
          action="https://form.run/api/v1/r/narefvvwy3x50dj63cwaeo3j"
          method="post"
        >
          <Title
            order={2}
            size="h1"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            })}
            weight={900}
            align="center"
          >
            {t('form.title')}
          </Title>

          <SimpleGrid
            cols={2}
            mt="xl"
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          >
            <TextInput
              label={t('form.name')}
              placeholder="Your name"
              name="name"
              variant="filled"
              {...form.getInputProps('name')}
            />
            <TextInput
              label={t('form.email')}
              placeholder="Your email"
              name="email"
              variant="filled"
              {...form.getInputProps('email')}
            />
          </SimpleGrid>

          <TextInput
            label={t('form.subject')}
            placeholder="Subject"
            mt="md"
            name="subject"
            variant="filled"
            {...form.getInputProps('subject')}
          />
          <Textarea
            mt="md"
            label={t('form.message')}
            placeholder="Your message"
            maxRows={10}
            minRows={5}
            autosize
            name="message"
            variant="filled"
            {...form.getInputProps('message')}
          />

          <Group position="center" mt="xl">
            <Button type="submit" size="md">
              {t('form.submit')}
            </Button>
          </Group>
        </form>
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

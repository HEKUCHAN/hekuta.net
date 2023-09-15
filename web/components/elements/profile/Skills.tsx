import {
  Text,
  Card,
  SimpleGrid,
  ThemeIcon,
  createStyles,
  rem,
} from '@mantine/core';
import { IconType } from 'react-icons';
import { BiLogoPython, BiLogoTypescript } from 'react-icons/bi';
import { SiNextdotjs, SiNuxtdotjs } from 'react-icons/si';
import { FaRust, FaGolang } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';

const useStyles = createStyles((theme) => ({
  skill: {
    display: 'flex',
  },

  skillIcon: {
    padding: theme.spacing.xs,
    marginRight: theme.spacing.md,
  },

  skillTitle: {
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
  },

  skillInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

type SkillType = {
  name: string;
  icon: IconType;
  description: string;
};

export default function Skills() {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);
  const skillsData: SkillType[] = [
    {
      name: 'Python',
      icon: BiLogoPython,
      description: t('languages_descriptions.python'),
    },
    {
      name: 'Golang',
      icon: FaGolang,
      description: t('languages_descriptions.golang'),
    },
    {
      name: 'Rust',
      icon: FaRust,
      description: t('languages_descriptions.rust'),
    },
    {
      name: 'TypeScript',
      icon: BiLogoTypescript,
      description: t('languages_descriptions.typescript'),
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      description: t('languages_descriptions.nextjs'),
    },
    {
      name: 'Nuxt.js',
      icon: SiNuxtdotjs,
      description: t('languages_descriptions.nuxtjs'),
    },
  ];
  const skills = skillsData.map((skill, index) => {
    return (
      <Card className={classes.skill} key={index}>
        <ThemeIcon
          variant="light"
          className={classes.skillIcon}
          size={60}
          radius="md"
        >
          <skill.icon size={48} />
        </ThemeIcon>
        <div className={classes.skillInfo}>
          <h3>{skill.name}</h3>
          <Text c="dimmed">{skill.description}</Text>
        </div>
      </Card>
    );
  });

  return (
    <SimpleGrid
      mt={40}
      cols={2}
      spacing={30}
      breakpoints={[
        { maxWidth: 1000, cols: 2, spacing: 20 },
        { maxWidth: 720, cols: 1, spacing: 10 },
      ]}
    >
      {skills}
    </SimpleGrid>
  );
}

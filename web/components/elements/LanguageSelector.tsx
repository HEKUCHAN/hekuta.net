import { useState } from 'react';
import { createStyles, UnstyledButton, Menu, Group, rem } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import ReactCountryFlag from 'react-country-flag';

const data = [
  { label: 'Japanese', value: 'ja', flag: 'JP' },
  { label: 'English', value: 'en', flag: 'US' },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: rem(200),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

export default function LanguageSelector() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(data[0]);
  const items = data.map((item) => (
    <Menu.Item onClick={() => setSelected(item)} key={item.label}>
      <Group>
        <ReactCountryFlag
          svg
          countryCode={item.flag}
          style={{
            fontSize: '12px',
            lineHeight: '12px',
          }}
          aria-label={item.label}
        />
        {item.label}
      </Group>
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="120"
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <ReactCountryFlag
              svg
              countryCode={selected.flag}
              style={{
                fontSize: '12px',
                lineHeight: '12px',
              }}
              aria-label={selected.label}
            />
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}

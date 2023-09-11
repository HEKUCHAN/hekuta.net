import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  rem,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandInstagram,
  IconChevronDown,
  IconBrandGithub,
  IconMail,
} from "@tabler/icons-react";
import { RiTwitterXLine } from "react-icons/ri";
import Link from "next/link";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  dropDown: {
    zIndex: 1004,
  },

  social: {
    width: rem(260),

    [theme.fn.smallerThan("sm")]: {
      width: "auto",
      marginLeft: "auto",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

export interface LayoutHeaderProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export default function LayoutHeader({ links }: LayoutHeaderProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <a
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        href={item.link}
        key={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Menu.Item>{item.label}</Menu.Item>
      </a>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
          zIndex={1005}
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropDown}>
            {menuItems}
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

  return (
    <Header height={56} mb={120} fixed={true}>
      <Container>
        <div className={classes.inner}>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              title="github"
              href="https://github.com/HEKUCHAN"
            >
              <IconBrandGithub size="1.1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              title="twitter"
              href="https://twitter.com/Heitor_Hirose"
            >
              <RiTwitterXLine />
            </ActionIcon>
            <ActionIcon
              size="lg"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
              title="instagram"
              href="https://www.instagram.com/hirose_heitor/"
            >
              <IconBrandInstagram size="1.1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              component={Link}
              title="Contact form"
              href="/form"
            >
              <IconMail size="1.1rem" stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              size="lg"
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle Theme"
            >
              {dark ? (
                <BsFillSunFill size={15} />
              ) : (
                <BsFillMoonFill size={15} />
              )}
            </ActionIcon>
          </Group>
        </div>
      </Container>
    </Header>
  );
}

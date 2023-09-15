import { ActionIcon } from '@mantine/core';
import { RiTwitterXLine } from 'react-icons/ri';

import {
  IconBrandInstagram,
  IconBrandGithub,
  IconMail,
} from '@tabler/icons-react';
import Link from 'next/link';

export default function SocialBottoms() {
  return (
    <>
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
        href="/contact"
      >
        <IconMail size="1.1rem" stroke={1.5} />
      </ActionIcon>
    </>
  );
}

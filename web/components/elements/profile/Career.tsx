import {
  Accordion,
  List,
  Text,
  Timeline,
  createStyles,
  rem,
} from '@mantine/core';
import { useTranslation } from 'next-i18next';
import { IoMdSchool } from 'react-icons/io';

const useStyles = createStyles((theme) => ({
  careerCase: {
    marginTop: rem(15),
  },
}));

// const careers: [
//   {
//     name: 'S高等学校 2021年4月～2024年3月';

//   },
// ];

export default function Skills() {
  const { classes } = useStyles();
  const { t } = useTranslation(['common']);

  return (
    <Accordion
      variant="filled"
      defaultValue="customization"
      className={classes.careerCase}
    >
      <Accordion.Item value="customization">
        <Accordion.Control>S高等学校 2021年4月～2024年3月</Accordion.Control>
        <Accordion.Panel>
          <Accordion variant="contained">
            <Accordion.Item value="flexibility">
              <Accordion.Control>
                株式会社doot インターン 2021年～2022年
              </Accordion.Control>
              <Accordion.Panel>
                Ruby on
                RailsとNuxt.jsを使用して、Cartreeというサービスを作成しました。
                主にフロントエンドを担当しましたが、バックエンドを触る機会がすこしあり、
                とても勉強になりました。
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="work">
              <Accordion.Control>業務委託請負中</Accordion.Control>
              <Accordion.Panel>
                現在はある企業の業務委託を受けて勤務しております。
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

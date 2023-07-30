import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { Tool } from '../tool/tool';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `tool`,
    children: <Tool />,
  },
  {
    key: '2',
    label: `Tab 2`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: '3',
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];

export function Home() {
  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}

import { Button, InputNumber, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';

import { message } from '@tauri-apps/api/dialog';

const { Option } = Select;

export enum Unit {
  S,
  M,
  H,
}

function toSecond(time: number, unit: Unit) {
  const valueMap = {
    [Unit.S]: time,
    [Unit.M]: time * 60,
    [Unit.H]: time * 60 * 60,
  }
  return valueMap[unit];
}

async function notice(text: string) {
  await message(text, { title: '', type: 'info' });
}

export function Reminder() {
  let timer: number | null = null;
  const [unit, setUnit] = useState(Unit.M);
  const [time, setTime] = useState(10);

  useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    };
  });

  const submit = useCallback(() => {
    let second = toSecond(time, unit);
    timer && clearInterval(timer);
    timer = setInterval(async () => {
      if (second-- <= 0) {
        timer && clearInterval(timer)
        await notice('时间到！！');
        return;
      }
      console.log('@@ time', second);
    }, 1000);
  }, [unit, time, timer]);


  const selectAfter = (
    <Select defaultValue={Unit.M} style={{ width: 60 }} onSelect={setUnit}>
      <Option value={Unit.S}>S</Option>
      <Option value={Unit.M}>M</Option>
      <Option value={Unit.H}>H</Option>
    </Select>
  );

  return (
    <Space>
      <InputNumber addonAfter={selectAfter} defaultValue={time} min={1} onChange={(v) => v && setTime(v)} />
      <Button type="primary" onClick={submit}>
        Start
      </Button>
    </Space>
  );
}

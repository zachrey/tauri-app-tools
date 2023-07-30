
import { Button, InputNumber, Select, Space } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

const { Option } = Select;

export enum Unit {
  S,
  M,
  H,
}
async function checkPermission() {
  let permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }
  return permissionGranted;
}

function toSecond(time: number, unit: Unit) {
  const valueMap = {
    [Unit.S]: time,
    [Unit.M]: time * 60,
    [Unit.H]: time * 60 * 60,
  }
  return valueMap[unit];
}

async function notice(message: string) {
  const permissionGranted = await checkPermission();
  if (permissionGranted) {
    sendNotification('Tauri is awesome!');
    sendNotification({ title: 'Reminder', body: message });
  }
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
        await notice('时间到!!!');
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

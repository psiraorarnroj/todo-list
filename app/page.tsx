"use client";

import { useState } from "react";
import Button from "./components/Button";
import Column from "./components/Column";
import initialData from "./data";
import { IItem } from "./data/interface/IItem";

export default function Home() {
  const uniqueTypes = [...new Set(initialData.map((item) => item.type))];

  const [mainList, setMainList] = useState<IItem[]>(initialData);
  const [columnStates, setColumnStates] = useState<{ [key: string]: IItem[] }>(
    Object.fromEntries(uniqueTypes.map((type) => [type, []])),
  );
  const [timers, setTimers] = useState<{ [key: string]: NodeJS.Timeout }>({});

  const columnData = uniqueTypes.map((type) => ({
    title: type,
    data: columnStates[type],
  }));

  const handleClick = (item: IItem) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));
    setColumnStates((prev) => ({
      ...prev,
      [item.type]: [...prev[item.type], item],
    }));

    const timerId = setTimeout(() => {
      setColumnStates((prev) => ({
        ...prev,
        [item.type]: prev[item.type].filter((i) => i.name !== item.name),
      }));
      setMainList((prev) => [...prev, item]);
    }, 5000);

    setTimers((prev) => ({ ...prev, [item.name]: timerId }));
  };

  const handleImmediateReturn = (item: IItem) => {
    if (timers[item.name]) {
      clearTimeout(timers[item.name]);
      setTimers((prev) => {
        const { [item.name]: _, ...rest } = prev;
        return rest;
      });
    }

    setColumnStates((prev) => ({
      ...prev,
      [item.type]: prev[item.type].filter((i) => i.name !== item.name),
    }));
    setMainList((prev) => [...prev, item]);
  };

  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 p-5 md:grid-cols-3">
      <div>
        {mainList.map((item) => (
          <Button
            key={item.name}
            className="mb-2"
            onClick={() => handleClick(item)}
          >
            {item.name}
          </Button>
        ))}
      </div>

      {columnData.map((column) => (
        <Column key={column.title} title={column.title}>
          {column.data.map((item) => (
            <Button
              key={item.name}
              className="mb-2"
              onClick={() => handleImmediateReturn(item)}
            >
              {item.name}
            </Button>
          ))}
        </Column>
      ))}
    </div>
  );
}

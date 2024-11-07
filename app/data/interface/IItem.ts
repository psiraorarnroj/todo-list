type ItemType = "Fruit" | "Vegetable";

interface IItem {
  type: ItemType;
  name: string;
}

export type { IItem, ItemType };

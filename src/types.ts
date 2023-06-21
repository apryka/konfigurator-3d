export enum DIRECTION {
  NORTH,
  EAST,
  SOUTH,
  WEST,
};

export enum VIEW {
  Size = "SIZE",
  Photo = "PHOTO",
  Products = "PRODUCTS",
};

export type RoomSize = [number, number];

export type Model = {
  name: string;
  id: string;
  rotation: number;
};

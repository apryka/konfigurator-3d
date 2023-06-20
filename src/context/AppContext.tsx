import { createContext } from "react";

const defaultValue: Record<string, any> = {};

export const AppContext = createContext(defaultValue);
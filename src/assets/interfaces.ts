import { ReactNode } from "react";

export interface IProtectedRoute {
  isSignedIn?: boolean;
  children?: ReactNode;
}

export interface IMenuList {
  label: string,
  link: string,
  menu?: string,
  mode?: string
  children?: IMenuList[],
}

export interface IOperday {
  date: string;
  id: number;
  isActive: boolean;
}

export interface IPurpose {
  code: number;
  name: string;
}

export interface IFilterTable {
  id: number;
  name: string;
}
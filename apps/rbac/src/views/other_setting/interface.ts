import useSettingsStore from '@/store/modules/settings';

const settingsStore = useSettingsStore();

export interface Item {
  name: string
  descripe: string
  type: string
  parentName: string
  childName: string
  open: boolean
  activeStyle: string
  lightData: string
  darkData: string
}

export type objType = typeof settingsStore.globalSettings;

export interface Form {
  dates: string
  company: string
  website: string
  beian: string
}

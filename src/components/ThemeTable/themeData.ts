import { DefaultTheme } from 'styled-components';
import { mapping, themes, ThemeObject, ThemeKey, ThemeKeys } from '@paljs/theme';

function getKeyValue(settings: ThemeObject, key: ThemeKey): ThemeKeys {
  if (settings[key] in settings) {
    return getKeyValue(settings, settings[key] as ThemeKey);
  }
  return settings[key];
}

function getThemeParent(settings: ThemeObject, theme: DefaultTheme['name'], withMap: string) {
  return (Object.keys(settings) as ThemeKey[])
    .filter((key) => (withMap !== '' && key.startsWith(withMap)) || withMap === '')
    .map((key) => {
      return {
        key,
        value: getKeyValue(settings, key),
        default: !themes[theme][key],
        parent: settings[key] in settings ? settings[key] : false,
      };
    });
}

export function getTheme(theme: DefaultTheme['name'], withMap = ''): ReturnThemeData[] {
  const map = withMap !== '' ? mapping : {};

  switch (theme) {
    case 'cosmic':
    case 'corporate':
    case 'dark':
      return getThemeParent({ ...themes.default, ...map, ...themes[theme]! }, theme, withMap);
    default:
      return getThemeParent({ ...themes.default, ...map }, theme, withMap);
  }
}

export interface ReturnThemeData {
  key: string;
  value: string;
  default: boolean;
  parent: string | boolean;
}

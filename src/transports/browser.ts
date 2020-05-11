import { Transport } from '../common/types';
import { getDateTime } from '../common/utils';
import { Levels } from '../common/consts';
import { BrowserColor } from '../common/colors';

export const BROWSER_COLORS = {
  [Levels.DEBUG]: `background: ${BrowserColor.MAGENTA}; color: ${BrowserColor.WHITE}; font-weight: bold;`,
  [Levels.INFO]: `background: ${BrowserColor.BLACK}; color: ${BrowserColor.WHITE}; font-weight: bold;`,
  [Levels.HTTP]: `background: ${BrowserColor.BLUE}; color: ${BrowserColor.WHITE}; font-weight: bold;`,
  [Levels.WARN]: `background: ${BrowserColor.YELLOW}; color: ${BrowserColor.BLACK}; font-weight: bold;`,
  [Levels.ERROR]: `background: ${BrowserColor.RED}; color: ${BrowserColor.WHITE}; font-weight: bold;`,
  [Levels.PANIC]: `background: ${BrowserColor.RED}; color: ${BrowserColor.WHITE}; font-weight: bold;`,
};

const dateTimeColor = `background: ${BrowserColor.CYAN}; color: ${BrowserColor.WHITE}; font-weight: bold;`;
const titleColor = `color: ${BrowserColor.BLACK}`;
const dividerColor = `color: ${BrowserColor.BLACK};`;

const transport: Transport = ({ settings, level, message, title }) => {
  const dateTime = settings?.showDateTime ? `%c${getDateTime()}%c | ` : '';

  const levelString = `%c[${level.toUpperCase()}]%c | `;

  const titleString = title ? `%c[${title.toUpperCase()}]%c | ` : '';

  if (dateTime && titleString) {
    console.log(
      `${dateTime}${levelString}${titleString}${message}`,
      dateTimeColor,
      dividerColor,
      BROWSER_COLORS[level],
      dividerColor,
      titleColor,
      dividerColor
    );
  } else if (dateTime) {
    console.log(
      `${dateTime}${levelString}${message}`,
      dateTimeColor,
      dividerColor,
      BROWSER_COLORS[level],
      dividerColor
    );
  } else if (titleString) {
    console.log(
      `${levelString}${titleString}${message}`,
      BROWSER_COLORS[level],
      dividerColor,
      titleColor,
      dividerColor
    );
  } else {
    console.log(
      `${levelString}${message}`,
      BROWSER_COLORS[level],
      dividerColor
    );
  }
};

export default transport;

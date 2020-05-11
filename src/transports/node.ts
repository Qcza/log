import { Transport } from '../common/types';
import { getDateTime } from '../common/utils';
import { NodeFgColor, NodeColorUtils, NodeBgColor } from '../common/colors';
import { Levels } from '../common/consts';

export const NODE_COLORS = {
  [Levels.DEBUG]: NodeFgColor.MAGENTA,
  [Levels.INFO]: NodeFgColor.WHITE,
  [Levels.HTTP]: NodeFgColor.BLUE,
  [Levels.WARN]: NodeFgColor.YELLOW,
  [Levels.ERROR]: NodeFgColor.RED,
  [Levels.PANIC]: NodeBgColor.RED + NodeFgColor.WHITE,
};

const transport: Transport = ({ settings, level, message, title }) => {
  const dateTime = settings?.showDateTime
    ? `${NodeFgColor.CYAN}${getDateTime()}${NodeColorUtils.RESET} | `
    : '';

  const levelString = `${NODE_COLORS[level]}[${level.toUpperCase()}]${
    NodeColorUtils.RESET
  } | `;

  const titleString = title
    ? `${NodeFgColor.WHITE}[${title.toUpperCase()}]${NodeColorUtils.RESET} | `
    : '';

  console.log(`${dateTime}${levelString}${titleString}${message}`);
};

export default transport;

import { Transport } from '../common/types';
import { getDateTime } from '../common/utils';
import { NodeFgColor, NodeColorUtils, NODE_COLORS } from '../common/consts';

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

  console.log(dateTime + levelString + titleString + message);
};

export default transport;

import { consola } from 'consola';

enum LOG_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
  WARN = 'warn',
  INFO = 'info',
  START = 'start',
  BOX = 'box',
}
enum EMOJI {
  ERROR = '🔴',
  SUCCESS = '🟢',
  WARN = '🟡',
  INFO = '🔵',
  START = '🟩',
  BOX = '🟧',
}

const createConsoleLog = consola.withTag(import.meta.env.VITE_APP_TITLE);

function createLog(type: LOG_TYPE, emoji: EMOJI) {
  return (message: string | Error) => {
    if (typeof message === 'string') {
      const msg = message.length > 0 ? `${emoji} ${message}` : '';
      if (_DEV_) {
        createConsoleLog[type](msg);
      }
    }
    else {
      const msg = message instanceof Error ? message : new Error(message);
      if (_DEV_) {
        _DEV_ && createConsoleLog[type](msg);
      }
    }
  };
}

export const useError = createLog(LOG_TYPE.ERROR, EMOJI.ERROR);
export const useSuccess = createLog(LOG_TYPE.SUCCESS, EMOJI.SUCCESS);
export const useWarn = createLog(LOG_TYPE.WARN, EMOJI.WARN);
export const useInfo = createLog(LOG_TYPE.INFO, EMOJI.INFO);
export const useStart = createLog(LOG_TYPE.START, EMOJI.START);
export const useBox = createLog(LOG_TYPE.BOX, EMOJI.BOX);

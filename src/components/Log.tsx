import { toARGDate } from '@/lib/utils';


const logLevelColor = {
  info: '#5186B2',
  warn: '#E1A22D',
  error: '#BF3F3F',
  plain: 'inherit',
};
const logLevelText = {
  info: 'INFO',
  warn: 'WARNING',
  error: 'ERROR',
};

type Props = {
  level?: 'info' | 'warn' | 'error' | 'plain';
  time?: false | Date | string;
  children?: React.ReactNode;
};

export default function Log({ level = 'plain', time, children }: Props) {
  const logTime = time === false ? false : level === 'plain' ? false : true;

  return (
    <div style={{
      display: 'flex',
    }}>
      {logTime ? (
        <div style={{ whiteSpace: 'pre', }}
        >{toARGDate(new Date(time || Date.now())) + ' '}
        </div>
      ) : null
      }
      {level === 'plain'
        ? null
        : (
          <div style={{
            display: 'flex',
            whiteSpace: 'pre',
          }}>[<div style={{
            display: 'flex',
            color: logLevelColor[level],
            fontWeight: 600,
          }}>{logLevelText[level]}</div>] </div>
        )
      }
      <div style={{
        flex: 1,
        display: 'flex',
      }}>
        {children}
      </div>
    </div>
  );
}

const logLevelColorOld = {
  info: '#7f9fba',
  warn: '#ebc272',
  error: '#cc6666',
  plain: 'inherit',
};

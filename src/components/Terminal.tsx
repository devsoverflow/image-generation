const terminalStyle = {
  dark: {
    backgroundColor: '#1f1f1f',
    color: '#eee',
  },
  light: {
    backgroundColor: '#EFEFEF',
    color: '#1f1f1f',
  },
};

type Props = {
  title: string,
  theme?: 'dark' | 'light' | 'random',
  children?: React.ReactNode;
  afterContent?: React.ReactNode;
};

export default function Terminal({ title, theme = 'dark', children, afterContent }: Props) {
  const style = terminalStyle[(
    theme !== 'random'
      ? theme
      : Math.random() > 0.5 ? 'dark' : 'light'
  )];

  return <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: style.backgroundColor,
    color: style.color,
    fontFamily: '"FiraCode"',
    borderRadius: '0.5rem',
    fontSize: '16px',
  }}>
    <div tw="flex border-b-2 p-[0.75rem] border-gray-500 justify-around relative">
      <div tw="flex absolute left-0 top-0 p-[0.75rem] mt-auto">
        <div tw="flex rounded-full w-4 h-4 mr-2 bg-red-500" />
        <div tw="flex rounded-full w-4 h-4 mr-2 bg-yellow-500" />
        <div tw="flex rounded-full w-4 h-4 bg-green-500" />
      </div>
      <div style={{ display: 'flex' }}>
        <p style={{
          fontSize: '1rem',
          margin: 0,
          padding: 0,
          fontWeight: 600
        }}>{title}</p>
      </div>
    </div>
    <div tw="flex p-[0.75rem] flex-1">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        flex: 1,
      }}>{children}
      </div>
    </div>
    {afterContent === undefined ?
      null :
      afterContent
    }
  </div>;
}


const signatureStyle = {
  dark: {
    color: '#ccc',
  },
  light: {
    color: '#3F3F3F',
  },
};

export function BotSignature(
  { theme = 'dark' }: { theme?: 'dark' | 'light'; }
) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
    }}>
      <div style={{
        display: 'flex',
        borderRadius: '0.5rem',
        padding: '0.5rem',
      }}>
        <p style={{
          fontSize: '0.75rem',
          margin: 0,
          padding: 0,
          color: signatureStyle[theme].color,
          fontWeight: 600,
        }}>by Estudiante ;)</p>
      </div>
    </div>
  );
}

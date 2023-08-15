// ~ 501 programing related quotes, from https://github.com/mudroljub/programming-quotes-api/blob/master/Data/quotes.json
import { pickRandom } from '@/lib/utils';
import quotes from './quotes.json';


function getQuote() {
  return pickRandom(quotes);
}

function breakUpQuote(quote: string, maxLineLength: number) {
  const words = quote.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if (line.length + word.length + 1 > maxLineLength) {
      lines.push(line);
      line = '';
    }
    line += word + ' ';
  }
  lines.push(line);
  return lines;
}


const styles = {
  dark: {
    symbol: {
      color: '#a1a1a1',
    },
    attr: {
      color: '#8cdcfe',
    },
    string: {
      color: '#E49575',
    },
  },
  light: {
    symbol: {
      color: '#3D3D3D',
    },
    attr: {
      color: '#0291C9',
    },
    string: {
      color: '#C13E0A',
    },
  }
};


type ObjectProps = {
  color: string,
  children?: React.ReactNode,
};
function Object({ color, children }: ObjectProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      color: color,
      whiteSpace: 'pre',
    }}>{"{"}{children}{"}"}</div>
  );
}

type FieldProps = {
  indent?: string,
  children?: React.ReactNode;
};
function Field({ indent = '  ', children }: FieldProps) {
  return <div style={{
    display: 'flex',
    whiteSpace: 'pre',
  }}>{indent}{children}</div>;
}

type AttrProps = {
  indent?: string,
  name: string,
  nameColor: string,
};
function Attr({ indent = '', name, nameColor }: AttrProps) {
  return (
    <div style={{
      display: 'flex',
      color: nameColor,
    }}>{indent}"{name}"</div>
  );
}

type StringProps = {
  value: string,
  valueColor: string,
};
function String({ value, valueColor }: StringProps) {
  return (
    <div style={{
      display: 'flex',
      color: valueColor,
    }}>{value}</div>
  );
}

type StringFieldProps = {
  name: string,
  nameColor: string,
  value: string,
  valueColor: string,
  indent?: string,
};
function StringField({ indent = '  ', name, nameColor, value, valueColor }: StringFieldProps) {
  return (
    <div style={{
      display: 'flex',
      whiteSpace: 'pre',
    }}>{indent}<Attr
        name={name}
        nameColor={nameColor}
      />: <String
        value={`"${value}"`}
        valueColor={valueColor}
      />,</div>
  );
}

type Props = {
  theme?: 'dark' | 'light';
};
export default function ProgrammingQuote({ theme = 'dark' }: Props) {
  const quote = getQuote();
  const quoteLines = breakUpQuote(quote.en, 80);

  const style = styles[theme];

  const quoteContent = quoteLines.length === 1 ? (
    <StringField
      name="en"
      nameColor={style.attr.color}
      value={quoteLines[0]}
      valueColor={style.string.color}
    />
  ) : (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Field indent="  "><Attr name="en" nameColor={style.attr.color} />: <String value={`"${quoteLines[0]}`} valueColor={style.string.color} /></Field>
      {...quoteLines.slice(1, -2).map(line => <String value={line} valueColor={style.string.color} />)}
      <Field indent=''><String value={quoteLines[quoteLines.length - 1].trimEnd() + "\""} valueColor={style.string.color} />,</Field>
    </div>
  );

  return (
    <Object color={style.symbol.color}>
      <StringField name="id" nameColor={style.attr.color} value={quote.id} valueColor={style.string.color} />
      {quoteContent}
      <StringField name="author" nameColor={style.attr.color} value={quote.author} valueColor={style.string.color} />
    </Object>
  );
}

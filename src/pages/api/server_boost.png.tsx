import BlankLine from '@/components/BlankLine';
import Log from '@/components/Log';
import Terminal, { BotSignature } from '@/components/Terminal';
import { DEFAULT_AVATARS } from '@/lib/default';
import { pickRandom } from '@/lib/utils';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';


// docs: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#dynamic-text-generated-as-image
export const config = {
  runtime: 'edge',
};


const quotes = [
  [
    "sera que empezo a cobrar? 🤔",
    "y en dolares?..."
  ],
  [
    "sera..., sera que",
    "se quiere culear al owner? 😏"
  ],
  [
    "sera que el owner es su crush? 😶",
  ],
  [
    "alguien deberia agradecerle...",
    "o bueno darle un beso 😳"
  ],
];


export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const user_id = searchParams.get('user_id');
  const avatar_id = searchParams.get('avatar_id');
  const avatarUrl = user_id && avatar_id ? `https://cdn.discordapp.com/avatars/${user_id}/${avatar_id}.png` : pickRandom(DEFAULT_AVATARS);

  const title = `📂 ~devs_overflow/discord_server/bot`;

  const theme = Math.random() > 0.5 ? 'dark' : 'light';
  const cardBackgroundImage = Math.random() > 0.5
    ? 'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'
    : 'linear-gradient(45deg, #874da2 0%, #c43a30 100%)';

  try {
    const [fontRegular, fontSemiBold] = await Promise.all([
      fetch(
        new URL('../../assets/FiraCode-Regular.ttf', import.meta.url),
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('../../assets/FiraCode-SemiBold.ttf', import.meta.url),
      ).then((res) => res.arrayBuffer()),
    ]);

    return new ImageResponse(
      (
        <Terminal
          title={title}
          theme={theme}
          afterContent={<BotSignature theme={theme} />}
        >
          <Log level="error">No se pudo conectar con la db</Log>
          <Log level="error">No existe manejador para el error, ignorandolo...</Log>
          <BlankLine />
          <Log level="info">Servidor boosteado por el miembro {username} ({user_id})</Log>
          <Log level="info">Enviando banner de agradecimiento...</Log>
          <Log level="warn">No se pudo establecer conexion con el canal de bienvenida, el banner a enviar es:</Log>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid black',
            borderRadius: '0.5rem',
            marginTop: '2rem',
            marginRight: '2rem',
            marginBottom: '1rem',
            marginLeft: '2rem',
            paddingTop: '1rem',
            paddingRight: '2rem',
            paddingBottom: '1rem',
            paddingLeft: '2rem',
            color: '#eee',
            backgroundImage: cardBackgroundImage,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1rem',
                justifyContent: 'space-between'
              }}>
                <img
                  width={128}
                  height={128}
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    objectFit: 'cover',
                    margin: '2rem',
                    marginRight: '0',
                    border: '1px solid black',
                    boxShadow: '0 3px 10px rgb(0,0,0,0.2)'
                  }} />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: '3rem',
                  fontWeight: 600,
                }}>
                  <div>{username}</div>
                  <div>Boosteo el servidor!</div>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  margin: '2rem',
                  marginLeft: '0',
                  filter: '0 3px 10px rgb(0,0,0,0.2)'
                }}>
                  <svg height="128" viewBox="0 0 24 24" width="128" xmlns="http://www.w3.org/2000/svg"><path d="m6.3599 4.33.41.84c.02245.04336.03052.09274.02304.14099s-.03013.09287-.06465.1274c-.03453.03453-.07915.05717-.1274.06465s-.09763-.00059-.14099-.02304l-.84-.41c-.03119-.01506-.06537-.02288-.1-.02288s-.06882.00782-.1.02288l-.84.41c-.04336.02245-.09274.03052-.141.02304-.04825-.00748-.09287-.03012-.12739-.06465-.03453-.03453-.05717-.07915-.06465-.1274s.00058-.09763.02304-.14099l.41-.84c.01505-.03119.02287-.06537.02287-.1s-.00782-.06881-.02287-.1l-.41-.84c-.01585-.04253-.01876-.08879-.00836-.13297.01039-.04417.03362-.08429.06676-.11529s.07471-.05151.11948-.05894c.04477-.00742.09074-.00144.13212.0172l.84.41c.03118.01506.06537.02288.1.02288s.06881-.00782.1-.02288l.84-.41c.04336-.02245.09274-.03052.14099-.02304s.09287.03012.1274.06465c.03452.03453.05717.07914.06465.1274.00748.04825-.00059.09763-.02304.14099l-.41.84c-.01211.02846-.01834.05907-.01834.09s.00623.06154.01834.09z" fill="#ffd836" /><path d="m12 2.70001-5.45996 5.46v7.67999l5.45996 5.46 5.46-5.46v-7.67999zm2.73 11.99999-2.73 2.74-2.72996-2.73v-5.41999l2.72996-2.73 2.73 2.73z" fill="#ff73fa" /><path d="m12 2.70001v3.86l2.73 2.73 2.73-1.13z" fill="#ffc0ff" /><path d="m9.27004 14.71-2.73 1.13 5.45996 5.46v-3.86z" fill="#e655d4" /><g fill="#d4e4ff"><path d="m16.2199 17.7h.01c.243 0 .44-.197.44-.44v-.89c0-.243-.197-.44-.44-.44h-.01c-.243 0-.44.197-.44.44v.89c0 .243.197.44.44.44z" /><path d="m16.2199 21.25h.01c.243 0 .44-.197.44-.44v-.89c0-.243-.197-.44-.44-.44h-.01c-.243 0-.44.197-.44.44v.89c0 .243.197.44.44.44z" /><path d="m15.3401 18.59v-.01c0-.243-.197-.44-.44-.44h-.89c-.243 0-.44.197-.44.44v.01c0 .243.197.44.44.44h.89c.243 0 .44-.197.44-.44z" /><path d="m18.8799 18.59v-.01c0-.243-.197-.44-.44-.44h-.89c-.243 0-.44.197-.44.44v.01c0 .243.197.44.44.44h.89c.243 0 .44-.197.44-.44z" /></g><path d="m9.27002 9.29v5.42l2.72998 2.73 2.73-2.73v-5.42l-2.73-2.73z" fill="#ffdef9" /><path d="m14.72 9.28998v.01l-5.42997 5.43002-.01-.01v-1.47l4.69997-4.71002z" fill="#fff" /><path d="m14.7201 11.34v1.5l-3.66 3.66-.75-.75z" fill="#fff" /></svg>
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '4px solid hsl(0, 0%, 50%)',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'hsl(0, 0%, 50%, 0.05)',
                width: '288px',
                marginLeft: '-1rem',
                fontSize: '0.75rem',
              }}>
                {...pickRandom(quotes).map((quote, i) => <div key={i}>{quote}</div>)}
              </div>
            </div>
          </div>
        </Terminal>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'FiraCode',
            data: fontRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'FiraCode',
            data: fontSemiBold,
            style: 'normal',
            weight: 600,
          },
        ],
        headers: {
          'Content-Disposition': `inline; filename="boost_${username}_${Date.now()}.png"`
        },
      },
    );
  }
  catch (error) {
    console.error(`Error during server boost og:\n${error}`);

    return new Response(
      `Failed to generate the image`,
      { status: 500, }
    );
  }
}

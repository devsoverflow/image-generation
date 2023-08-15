import BlankLine from '@/components/BlankLine';
import Log from '@/components/Log';
import MemberInfo from '@/components/MemberInfo';
import ProgrammingQuote from '@/components/ProgrammingQuote';
import Terminal, { BotSignature } from '@/components/Terminal';
import { RANDOM_ERROR_MESSAGES } from '@/lib/default';
import { pickRandom } from '@/lib/utils';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';


// docs: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-examples#dynamic-text-generated-as-image
export const config = {
  runtime: 'edge',
};


export default async function handler(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const user_id = searchParams.get('user_id');
  const avatar_id = searchParams.get('avatar_id');

  const title = `📂 ~devs_overflow/discord_server/bot`;
  const memberInitSuccess = Math.random() > 0.5;

  const theme = Math.random() > 0.5 ? 'dark' : 'light';

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
          <Log level="error">{pickRandom(RANDOM_ERROR_MESSAGES)}</Log>
          <BlankLine />
          <Log level="info">Nuevo usuario en el servidor</Log>
          <Log level="info">Informacion del usuario:</Log>
          <MemberInfo
            id={user_id as string}
            username={username as string}
            avatar={avatar_id as string}
            bot={false}
          />
          <Log level="info">Inicializando usuario...</Log>
          {memberInitSuccess
            ? <Log level="info">Miembro {username ?? "'no username'"} inicializado con exito ✅</Log>
            : <Log level="error">Miembro {username ?? "'no username'"} no se inicializo con exito ❌, un admin deberia hacerlo manualmente...</Log>
          }
          <BlankLine />
          <Log level="warn">No se pudo establecer conexion con el canal de bienvenida, la cita a enviar es:</Log>
          <ProgrammingQuote theme={theme} />
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
          'Content-Disposition': `inline; filename="welcome_${username}_${Date.now()}.png"`
        },
      },
    );
  }
  catch (error) {
    console.error(`Error during welcome og:\n${error}`);

    return new Response(
      `Failed to generate the image`,
      { status: 500, }
    );
  }
}

import { DEFAULT_AVATARS } from '@/lib/default';
import { pickRandom } from '@/lib/utils';


type ID = string;

type Props = {
  id: ID,
  bot: boolean,
  username: string,
  avatar: ID,
  accentColor?: number,
};

export default function MemberInfo({ id, username, avatar }: Props) {
  const avatarUrl = id && avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png` : pickRandom(DEFAULT_AVATARS);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex' }}>{`> id: ${id ?? "'id' not provided"}`}</div>
      <div style={{ display: 'flex' }}>{`> nombre de usuario: ${username ?? "'username' not provided"}`}</div>
      <div style={{ display: 'flex' }}>{`> avatar:`} <img
        width={64}
        height={64}
        src={avatarUrl} alt="avatar"
        style={{
          objectFit: 'cover',
          marginLeft: '16px',
          marginTop: '8px',
          marginBottom: '8px',
          boxShadow: '0px 0px 0px 1px black, 0px 0px 0px 3px #ccc, 0px 0px 0px 4px black'
        }} /></div>
    </div>
  );
}

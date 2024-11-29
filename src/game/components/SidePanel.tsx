import { GAME_FONT_COLOR } from '../../constants';

export const SidePanel = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#5f5e7d',
        borderRadius: '20px',
        padding: '5px',
        boxShadow: '10px 10px 0px #77c9ff',
        border: '2px solid #2d3857',
        color: GAME_FONT_COLOR,
      }}
    >
      <div
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          border: 'inherit',
          borderRadius: 'inherit',
          // justifyContent: 'space-evenly',
          backgroundColor: '#5f5e7d',
          // padding: '5px',
        }}
      >
        <Item>
          <div>Block</div>
          <div>Next Block</div>
        </Item>
        <Item>
          <div>0</div>
          <div>High Score</div>
        </Item>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1',
            justifyContent: 'end',
          }}
        >
          <img
            src="/public/chill_guy.png"
            alt="Tetris Logo"
            style={{
              maxWidth: '100px',
              alignItems: 'center',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        borderBottom: '2px solid #2d3857',
      }}
    >
      {children}
    </div>
  );
};
import { CDN_HOST } from '../../config';
import { GAME_FONT_COLOR } from '../../constants';
import { PauseMessage, ResumeMessage } from '../../types';
import { useStoreInContext } from '../store/store';

export const SidePanel = () => {
  const { ws, gameState } = useStoreInContext((state) => state);

  const handlePause = () => {
    const message: PauseMessage = {
      type: 'pause',
    };
    ws.send(JSON.stringify(message));
  };

  const handleResume = () => {
    const message: ResumeMessage = {
      type: 'resume',
    };
    ws.send(JSON.stringify(message));
  };
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
          backgroundColor: '#5f5e7d',
        }}
      >
        <Item>
          <div>{gameState.nextShape}</div>
          <div>Next Block</div>
        </Item>
        <Item>
          <div>0</div>
          <div>High Score</div>
        </Item>
        <Item>
          {gameState.isGamePaused ? (
            <button disabled={gameState.isGameOver} onClick={handleResume}>
              {' '}
              Resume{' '}
            </button>
          ) : (
            <button disabled={gameState.isGameOver} onClick={handlePause}>
              {' '}
              Pause{' '}
            </button>
          )}
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
            src={`https://${CDN_HOST}/tetris-client/chill_guy.png`}
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

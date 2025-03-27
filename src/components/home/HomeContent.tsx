import { Box, Typography } from '@mui/material';
import lolImg from '../../assets/images/lol.jpg';
import homeVideo from '../../assets/videos/home-video.mp4';

const imgStyle = {
  maxWidth: '680px',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '8px',
  border: '1px solid hsla(0, 0%, 100%, 0.4)',
  boxShadow: '3px 3px 6px hsla(0, 0%, 0%, 0.4)',

  '@media (max-width: 1440px)': {
    maxWidth: '600px',
  },
  '@media (max-width: 1280px)': {
    maxWidth: '520px',
  },
  '@media (max-width: 900px)': {
    maxWidth: '100%',
  },
};

const textStyle = {
  overflowY: 'auto',
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
  '@media (min-width: 1921px)': {
    fontSize: '20px',
  },
};

const HomeContent = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '1.5rem',
          mb: 1,
          '@media (max-width: 900px)': {
            textAlign: 'center',
          },
          '@media (max-width: 640px)': {
            fontSize: '1.3rem',
          },
          '@media (min-width: 1921px)': {
            fontSize: '1.7rem',
          },
        }}
      >
        All Your Games. One Horizon.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          height: '400px',

          '@media (max-width: 1280px)': {
            height: '320px',
          },
          '@media (max-width: 900px)': {
            flexDirection: 'column',
            alignItems: 'center',
            height: '720px',
          },
        }}
      >
        <Box
          component='img'
          src={lolImg}
          alt='League of Legends Image'
          sx={imgStyle}
        />
        <Typography sx={textStyle}>
          <b>Horizon</b> is not just another gaming website — it is a universe
          crafted for gamers by gamers. It's a place where passion for
          interactive storytelling, digital art, and immersive experiences all
          come together in one powerful, beautifully designed platform. Whether
          you're a lifelong enthusiast or just stepping into the world of video
          games, <b>Horizon</b> gives you everything you need to explore, track,
          and enjoy your gaming life to the fullest. Our mission is simple: to
          help players discover games they'll love, stay connected with what's
          new and exciting, and build a digital space that reflects their unique
          journey through the world of gaming. Every game tells a story — and{' '}
          <b>Horizon</b> helps you find the ones worth playing. From fast-paced
          action shooters to slow-burn strategy games, from retro gems to the
          latest triple-A releases, our database covers thousands of titles
          across all platforms, including{' '}
          <i>PC, PlayStation, Xbox, Nintendo, and mobile</i>. For each game,{' '}
          <b>Horizon</b> provides detailed information, release dates, developer
          insights, system requirements, screenshots, trailers, community
          ratings, and honest user reviews. You don't just read about games —
          you experience them through a platform built to make every title come
          alive. <b>Horizon</b> isn't about overwhelming you with data. It's
          about guiding you toward the games that truly matter to you. Our
          advanced recommendation system learns your preferences and suggests
          new titles based on your favorite genres, gameplay styles, and the
          games you've already loved. Whether you're chasing the next big
          open-world adventure or looking for a cozy indie puzzle game to relax
          with, <b>Horizon</b> brings the right suggestions at the right time.
          It's like having a friend who always knows what you'd enjoy playing
          next. But <b>Horizon</b> isn't just about the games — it's about the
          player. Create and customize your personal profile, build a game
          collection that showcases your taste, track what you've played and
          what you plan to play, and share your thoughts with a growing
          community of passionate gamers. Join discussions, discover hidden gems
          others are talking about, and connect with like-minded players from
          around the world. <b>Horizon</b> turns solitary gaming into a shared
          experience, where your opinions and discoveries matter. We're not here
          to replace the magic of gaming — we're here to amplify it.{' '}
          <b>Horizon</b> enhances every part of your gaming life, from staying
          informed to feeling inspired. Whether you want to dive into nostalgia
          or stay ahead of the curve, <b>Horizon</b>
          gives you the tools, space, and freedom to explore gaming on your own
          terms. This is more than just a website. This is where your gaming
          story lives, grows, and evolves. Welcome to <b>Horizon</b> — your
          personal gateway to the world of games.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 6,
          mb: 5,
          position: 'relative',

          '@media (max-width: 900px)': {
            my: 5,
          },
        }}
      >
        <Box
          component='video'
          src={homeVideo}
          autoPlay
          loop
          muted
          playsInline
          sx={{
            maxHeight: '720px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid hsla(0, 0%, 100%, 0.4)',
            boxShadow: '3px 3px 6px hsla(0, 0%, 0%, 0.4)',
            filter: 'brightness(30%)',
            objectFit: 'cover',

            '@media (min-width: 1921px)': {
              maxHeight: '840px',
            },
            '@media (min-width: 2561px)': {
              maxHeight: '980px',
            },
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography
            sx={{
              fontSize: '2.3rem',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              borderRight: '2px solid',
              width: '0ch',
              animation:
                'typing 2s steps(7) infinite alternate, blink .75s step-end infinite',
              '@keyframes typing': {
                from: { width: '0ch' },
                to: { width: '8ch' },
              },
              '@keyframes blink': {
                '0%, 100%': { borderColor: 'transparent' },
                '50%': { borderColor: 'currentColor' },
              },

              '@media (max-width: 768px)': {
                fontSize: '1.5rem',
              },
            }}
          >
            HORIZON
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          my: 5,
          '@media (max-width: 768px)': {
            fontSize: '14px',
          },
          '@media (min-width: 1921px)': {
            fontSize: '20px',
          },
        }}
      >
        With a clean design and user-friendly interface, <b>Horizon</b> lets you
        easily browse thousands of games across all platforms - from PC and
        consoles to mobile. Stay up to date with the latest trends, read what
        other players are saying, and never miss a must-play title again. Our
        goal is to create a space where gamers feel at home, inspired, and
        always ready for their next adventure.
      </Typography>
    </Box>
  );
};

export default HomeContent;

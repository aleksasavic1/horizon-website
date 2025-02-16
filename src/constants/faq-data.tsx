import { Link, Typography } from '@mui/material';

const contentColor = 'hsla(0, 0%, 100%, 0.9)';
const spanColor = '#53b896';

export const FAQ_DATA = [
  {
    title: 'Who is the author of this project?',
    content: (
      <Typography sx={{ color: contentColor }}>
        The project was created by{' '}
        <span style={{ color: spanColor }}>Aleksa Savic.</span> You can find his
        GitHub profile here:{' '}
        <Link
          href='https://github.com/aleksasavic1'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub - aleksasavic1.
        </Link>
      </Typography>
    ),
  },
  {
    title: 'How was this project created?',
    content: (
      <Typography sx={{ color: contentColor }}>
        This project was built using{' '}
        <span style={{ color: spanColor }}>React</span> with{' '}
        <span style={{ color: spanColor }}>Vite, TypeScript, </span>
        and styled with <span style={{ color: spanColor }}>
          Material UI
        </span>{' '}
        for a modern and responsive design.
      </Typography>
    ),
  },
  {
    title: 'Where are these games sourced from?',
    content: (
      <Typography sx={{ color: contentColor }}>
        These games are fetched using the{' '}
        <span style={{ color: spanColor }}>RAWG API,</span> which provides
        comprehensive data on video games from various platforms.
      </Typography>
    ),
  },
  {
    title: 'How can I contribute to this project?',
    content: (
      <Typography sx={{ color: contentColor }}>
        You can contribute by submitting issues, suggesting improvements, or
        creating pull requests on the{' '}
        <Link
          href='https://github.com/aleksasavic1/horizon-website'
          target='_blank'
          rel='noopener noreferrer'
        >
          project's GitHub repository
        </Link>
        . Any contributions are greatly appreciated!
      </Typography>
    ),
  },
  {
    title: 'Are there any future plans for this project?',
    content: (
      <Typography sx={{ color: contentColor }}>
        Yes! Planned improvements include adding user authentication, game
        reviews, and a more interactive UI. Stay tuned for updates and feel free
        to suggest features!
      </Typography>
    ),
  },
  {
    title: 'How can I report a bug or request a feature?',
    content: (
      <Typography sx={{ color: contentColor }}>
        If you encounter any issues or have suggestions, you can report them in
        the{' '}
        <Link
          href='https://github.com/aleksasavic1/horizon-website/issues'
          target='_blank'
          rel='noopener noreferrer'
        >
          GitHub Issues
        </Link>{' '}
        section of the repository.
      </Typography>
    ),
  },
];

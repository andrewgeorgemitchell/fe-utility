import { SetStateAction } from 'react';
import { createUseStyles } from 'react-jss';

import { NavLink } from '../ResponsiveHeader';

const useStyles = createUseStyles<'root', { open: boolean }>({
  root: ({ open }) => ({
    display: open ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    background: '#fff',
    zIndex: 5000,
  }),
});

type DrawerProps = {
  links: NavLink[];
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
};

const Drawer = ({ links, open }: DrawerProps): JSX.Element => {
  const classes = useStyles({ open });

  return (
    <div className={classes.root}>
      {links.map(({ to, text }) => (
        <a href={to}>{text}</a>
      ))}
    </div>
  );
};

export default Drawer;

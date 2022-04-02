import { Twirl as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';

import Drawer from './Drawer/Drawer';

const cx = (classes: string[]) => classes.join(' ');

const useStyles = createUseStyles<
  'root' | 'linksCont' | 'link' | 'logo' | 'hamburgerCont',
  { variant: HeaderVariant; breakpoint: number }
>({
  root: ({ variant, breakpoint }) => ({
    display: 'grid',
    zIndex: 1000,
    gridTemplateColumns: '100px auto',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
  "logo nav"
`,
    [`@media (min-width: ${breakpoint}px)`]: {
      gridTemplateColumns:
        variant === HeaderVariant.Default ? '100px auto' : 'auto',
      gridTemplateRows:
        variant === HeaderVariant.Default ? 'auto' : '75px 50px',
      gridTemplateAreas:
        variant === HeaderVariant.Default
          ? `
      "logo nav"
    `
          : `
    "logo"
    "nav"
  `,
    },
  }),
  logo: ({ variant }) => ({
    marginLeft: variant === HeaderVariant.Default ? '0px' : 'auto',
    marginRight: variant === HeaderVariant.Default ? '0px' : 'auto',
  }),
  linksCont: ({ variant, breakpoint }) => ({
    marginLeft: variant === HeaderVariant.Default ? '0px' : 'auto',
    marginRight: variant === HeaderVariant.Default ? '0px' : 'auto',
    gridArea: 'nav',
    display: 'none',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [`@media (min-width: ${breakpoint}px)`]: {
      display: 'flex',
    },
  }),
  link: {
    '&:not(:first-child)': {
      marginLeft: '1rem',
    },
    padding: 10,
  },
  hamburgerCont: ({ breakpoint }) => ({
    zIndex: 10000,
    gridArea: 'nav',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [`@media (min-width: ${breakpoint}px)`]: {
      display: 'none',
    },
  }),
});

enum HeaderVariant {
  Default = 'default',
  Vertical = 'vertical',
}

export type NavLink = {
  to: string;
  text: string;
  component?: React.ComponentType<{ className: string; to: string }>;
  subLinks?: Omit<NavLink, 'subLinks'>[];
};

export type ResponsiveHeaderProps = {
  logo?: {
    src: string;
    alt: string;
  };
  links: NavLink[];
  variant?: HeaderVariant;
  className?: string;
  breakpoint?: number;
};

const ResponsiveHeader = ({
  logo,
  links,
  variant = HeaderVariant.Default,
  className,
  breakpoint = 768,
}: ResponsiveHeaderProps): JSX.Element => {
  const classes = useStyles({ variant, breakpoint });
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className={cx([classes.root, className])}>
        {logo && <img className={classes.logo} src={logo.src} alt={logo.alt} />}
        <div className={classes.linksCont}>
          {links.map(({ to, text, component: Component }) => (
            <>
              {Component ? (
                <Component className={classes.link} to={to}>
                  {text}
                </Component>
              ) : (
                <a className={classes.link} href={to}>
                  {text}
                </a>
              )}
            </>
          ))}
        </div>
        <div className={classes.hamburgerCont}>
          <Hamburger onToggle={() => setOpen((curr) => !curr)} />
        </div>
      </nav>
      <Drawer open={open} setOpen={setOpen} links={links} />
    </>
  );
};

export default ResponsiveHeader;

import Link from "next/link";

interface NavbarProps {
  label: string;
  href: string;
}
export const NavbarLink: React.FC<NavbarProps> = ({ label, href }) => {
  return (
    <Link
      href={href}
      className="text-md sm:text-lg font-thin tracking-widest text-onBackground hover:opacity-80"
    >
      {label}
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="flex flex-row py-5 gap-4 md:gap-10 justify-center items-center">
      <NavbarLink label="Home" href="/home" />
      <NavbarLink label="Dashboard" href="/dashboard" />
      <NavbarLink label="Team" href="/team" />
      <NavbarLink label="About" href="/about" />
    </div>
  );
};

export default Navbar;

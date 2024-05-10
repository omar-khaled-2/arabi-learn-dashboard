import Link from "next/link";

interface LinkProps {
  title: string;

  href: string;
}
const NavLink: React.FC<LinkProps> = ({ title, href }) => {
  return (
    <Link
      href={href}
      className="lg:text-3xl text-lg font-thin tracking-widest hover:opacity-80"
    >
      {title}
    </Link>
  );
};
const SideBar = () => {
  return (
    <div className="flex flex-col lg:w-[400px] ">
      {/* <p className="text-3xl text-white py-2">Arabi Learn</p> */}
      <div className="flex gap-20 justify-center items-center flex-1 flex-row lg:flex-col">
        <NavLink title="Skills" href="/dashboard/skills" />
        <NavLink title="Questions" href="/dashboard/questions" />
      </div>
    </div>
  );
};

export default SideBar;

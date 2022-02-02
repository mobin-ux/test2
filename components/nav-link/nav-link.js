import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ title, active, href, icon, target, iconStyle, style }) => {
  const router = useRouter();
  const activeClass = router.pathname === href || active ? "text-payrue-home-blue" : "";
  return (
    <Link href={href} prefetch={false}>
      <a
        target={target}
        className={`
        transition
        duration-200
        px-4
        py-1
        rounded-md
        inline-flex
        items-center
        text-gray-400
        hover:bg-blue-100
        hover:text-blue-600
        ${activeClass}
          `}
        style={style}
      >
        {title}
        {icon && <img src={icon} alt={title} style={iconStyle} />}
      </a>
    </Link>
  );
};

NavLink.defaultProps = {
  className: "",
  style: {},
};

export { NavLink };

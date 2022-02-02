import Link from "next/link";
import { useRouter } from "next/router";

const data = {
  sidebar: [
    {
      title: "Categories",
      href: "/admin/categories",
    },
  ],
};

const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex mx-14">
      <div className="w-80 flex flex-col border-r-2 gap-2 px-2">
        {data.sidebar.map((item) => (
          <Link prefetch={false} href={item.href} key={item.title}>
            <a
              className={`py-2 block w-full items-center cursor-pointer text-center hover:bg-blue-100 hover:text-blue-600 ${
                router.pathname === item.href && "bg-blue-50 text-blue-600"
              }`}
            >
              {item.title}
            </a>
          </Link>
        ))}
      </div>
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export { AdminLayout };

import { backendUrl } from "../../hooks/useAPI";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { rgbDataURL } from "../../helpers/rgbDataUrl";

const CategoryCard = ({ image, name, id }) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/categories/${id}`);
  };
  if (!image) return <></>;
  return (
    <div
      className="border rounded-2xl cursor-pointer hover:shadow transition duration-200 overflow-hidden each-slide mx-4"
      // style={{ flex: "0 0 13rem" }}
    >
      <div className="relative w-full h-52" onClick={onClick}>
        {/* <Link href={`/categories/${id}`}> */}
        <Image
          layout="fill"
          placeholder="blur"
          blurDataURL={rgbDataURL()}
          src={`${backendUrl}/uploads/categories/${image}`}
          alt={name.toLowerCase()}
          className="object-cover"
        />
        {/* </Link> */}
      </div>
      <Link prefetch={false} href={`/categories/${id}`}>
        <a className="border-t block text-payrue-black py-2 text-center">
          {name}
        </a>
      </Link>
    </div>
  );
};

export { CategoryCard };

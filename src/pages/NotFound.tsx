import { Link } from "react-router-dom";
import { Center } from "../share/components";

export default function NotFoundPage() {
  return (
    <Center>
      <h1 className={`text-[30px] font-bold `}>Page Not found</h1>
      <p className="text-center">
        <Link
          to={"/"}
          className={`inline-block mt-5 text-center rounded-full px-5 py-1.5 cursor-pointer`}
        >
          Go home
        </Link>
      </p>
    </Center>
  );
}

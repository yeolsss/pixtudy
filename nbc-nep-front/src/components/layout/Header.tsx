import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header>
      <h1>LOGO</h1>
      <button>LOGIN</button>
      <button>LOGOUT</button>
      <button onClick={() => router.push("/dashboard")}>DASH BOARD</button>
    </header>
  );
};

export default Header;

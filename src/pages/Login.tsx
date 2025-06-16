import axios from "axios";
import { useEffect, useRef, useState, type FormEventHandler } from "react";
import { useAuthContext } from "../stores/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Center } from "../share/components";

export type AuthResponse = {
  token: string;
  refresh_token: string;
  user: {
    username: string;
    role: string;
  };
};

const LOGIN_URL =
  (import.meta.env.VITE_API_ENDPOINT || "https://nest-mobile.vercel.app/api") +
  "/auth/login/";

export default function LoginPage() {
  const { setUser, user, loading } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrorMsg] = useState("");
  const [fetching, setFetching] = useState(false);

  const userInputRef = useRef<HTMLInputElement | null>(null);

  const navigator = useNavigate();

  // hooks

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      setFetching(true);
      setErrorMsg("");

      const res = await axios.post(
        LOGIN_URL,
        { username, password },
        {
          withCredentials: true,
        },
      );

      const data = res.data as AuthResponse;

      setUser({
        role: data.user.role,
        token: data.token,
        username: data.user.username,
      });
    } catch (error: any) {
      console.log({ error });

      setErrorMsg(JSON.stringify(error.message) + JSON.stringify(error.code));

      // if (!error?.response) {
      //   setErrorMsg("No server response");
      // } else if (error?.response.status === 401) {
      //   setErrorMsg("User name or password is incorrect !");
      // } else {
      //   setErrorMsg("Sign in fail");
      // }
      console.log(">>> error", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    userInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user) navigator("/");
  }, [user, loading]);

  const classes = {
    formContainer:
      "p-5 border border-black/10 w-[400px] max-w-[90vw] shadow-[4px_4px_0px_rgba(0,0,0,0.1)] bg-white rounded-xl space-y-5",
    label: "font-[500] ",
    errMsg:
      "text-red-500 font-[500] text-center bg-red-500/15 py-[4px] rounded-[6px]",
  };

  return (
    <>
      <Center>
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          {errMsg && !fetching && (
            <h2 className={`${classes.errMsg}`}>{errMsg}</h2>
          )}
          <h1 className="text-center text-[24px] font-[500]">Sign In</h1>
          <div className={"space-y-[6px]"}>
            <label className={classes.label} htmlFor="name">
              Username
            </label>
            <input
              ref={userInputRef}
              autoComplete="off"
              className="my-input"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
            />
          </div>
          <div className={"space-y-[6px]"}>
            <label className={classes.label} htmlFor="image">
              Password
            </label>
            <input
              type="text"
              autoComplete="off"
              className="my-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            />
          </div>

          <Button loading={fetching} className="h-[40px] w-full" type="submit">
            Sign In
          </Button>
        </form>
      </Center>
    </>
  );
}

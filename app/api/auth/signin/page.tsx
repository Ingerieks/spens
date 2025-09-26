"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

export default function SignIn() {
  const [providers, setProviders] = useState<any>({});
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  //This is for future use if implementing other providers for SSO
  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-3xl font-semibold">Sign in</h1>
      </div>
      <div className="flex flex-col my-4 rounded-xs">
        <div className="flex justify-center">
          <form className="flex flex-col border border-gray-200 justify-center p-4">
            <input
              name="email"
              placeholder="username"
              className="border border-gray-200 my-4 p-2 rounded-xs"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="password"
              placeholder="password"
              type="password"
              className="border border-gray-200 p-2 rounded-xs"
              onChange={(e) => setPasword(e.target.value)}
            />
            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="bg-yellow-300 p-2 text-black rounded-xs"
                onClick={() =>
                  signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: true,
                    callbackUrl: "/recipes",
                  })
                }
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        {/*  */}
      </div>
      {/* {Object.values(providers ?? {}).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="w-full mb-3 py-2 px-4 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
    </div>
  );
}

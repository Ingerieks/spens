"use client";
import LoginButton from "./components/loginButton";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[1fr_auto] min-h-screen">
      <main className="flex flex-col gap-[32px] row-start-1 items-center sm:items-start w-full">
        <div className="w-full">
          <h1>Create, add, and share your favourite recipes</h1>
          <h1>Sign in to get started</h1>
          <LoginButton />
        </div>
      </main>
    </div>
  );
}

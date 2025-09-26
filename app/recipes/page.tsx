"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { recipes } from "@/mockData/recipes";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import Link from "next/link";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-4 ">
      {recipes.map((recipe, index) => (
        <Link key={index} href={`/recipes/${recipe._id}`} className="">
          <div className="border border-gray-200 rounded-xs p-2 m-2">
            <h1 className="text-lg">{recipe.recipeName}</h1>
            <div className="mt-2">
              {recipe.groceries && (
                <ShoppingCartOutlinedIcon style={{ color: "#facc15" }} />
              )}
              {recipe.shared && (
                <PeopleAltOutlinedIcon style={{ color: "#facc15" }} />
              )}
            </div>
            {/* <div className="flex flex-row">
              {recipe.labels.map((label, index) => (
                <h3
                  className="border border-gray-200 rounded-full px-2 py-1 mr-2 mt-6"
                  key={index}
                >
                  {label}
                </h3>
              ))}
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
}

import type { NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useRequireAuth from "../../lib/useRequireAuth";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log('SessionProvider', session);

  const router = useRouter()


  // const session = useRequireAuth()
  // if(!session) return <div>Loading...</div>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            {session ? session.user.email : "Guest"}
          </a>
        </h1>
        <button
          onClick={() => session ? signOut() : signIn()}
          type="button"
          className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block mt-10"
        >
          <span className="inline-block mr-2">
            {session ? 'SignOut' : 'SignIn'}
          </span>
        </button>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

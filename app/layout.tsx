import SessionProvider from "../components/SessionProvider";
import Sidebar from "../components/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "../styles/globals.css";
import Login from "../components/Login";
import ClientProvider from "../components/ClientProvider";

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <head>
        <title>Chat GPT</title>
      </head>
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202123] max-w-xs overflow-y-auto h-screen md:min-w-[20rem]">
                <Sidebar />
              </div>

              <ClientProvider />
              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}

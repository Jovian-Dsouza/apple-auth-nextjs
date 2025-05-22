import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);

  // Safely extract accessToken from session
  const accessToken =
    session && typeof session === "object" && "accessToken" in session
      ? (session as { accessToken?: string }).accessToken
      : undefined;

  // Safely extract idToken from session
  const idToken =
    session && typeof session === "object" && "idToken" in session
      ? (session as { idToken?: string }).idToken
      : undefined;

  const [copiedId, setCopiedId] = useState(false);

  const handleCopy = () => {
    if (accessToken) {
      navigator.clipboard.writeText(accessToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleCopyId = () => {
    if (idToken) {
      navigator.clipboard.writeText(idToken);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-8 rounded shadow-md flex flex-col items-center gap-6">
        <Image src="/apple.svg" alt="Apple logo" width={40} height={40} />
        {status === "authenticated" ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <span className="font-semibold text-lg">Access Token</span>
            <div className="flex items-center gap-2 w-full">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs w-full overflow-x-auto">
                {accessToken}
              </code>
              <button
                onClick={handleCopy}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <span className="font-semibold text-lg mt-4">ID Token</span>
            <div className="flex items-center gap-2 w-full">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs w-full overflow-x-auto">
                {idToken}
              </code>
              <button
                onClick={handleCopyId}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
              >
                {copiedId ? "Copied!" : "Copy"}
              </button>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("apple")}
            className="flex items-center gap-2 w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800 justify-center"
          >
            <Image src="/apple.svg" alt="Apple logo" width={20} height={20} />
            Sign in with Apple
          </button>
        )}
      </div>
    </div>
  );
}

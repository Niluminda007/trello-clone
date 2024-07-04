"use client";

import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

interface InviteBoardPageProps {
  params: {
    token: string;
  };
}

const InviteBoardPage = ({ params }: InviteBoardPageProps) => {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateBoardInviteToken = async () => {
      try {
        setIsValidating(true);
        const data = await fetcher({
          url: "/invite/w/validate",
          method: "POST",
          data: {
            token: params.token,
          },
        });
        if (data && data.redirectUrl) {
          router.push(data.redirectUrl);
        } else {
          setError("No redirect URL found in the response");
        }
      } catch (error) {
        console.error("Error validating invite token:", error);
        setError("Error validating invite token");
      } finally {
        setIsValidating(false);
      }
    };

    const timer = setTimeout(() => {
      validateBoardInviteToken();
    }, 3000);

    return () => clearTimeout(timer);
  }, [params.token, router]);

  return (
    <>
      {error && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-lg">{error}</div>
        </div>
      )}
    </>
  );
};

export default InviteBoardPage;

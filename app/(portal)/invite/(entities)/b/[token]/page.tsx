// "use client";

// import { fetcher } from "@/lib/fetcher";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";

// const Scene = dynamic(
//   () => import("@/components/modals/3d-modals/robot/Scene"),
//   { ssr: false }
// );

// interface InviteBoardPageProps {
//   params: {
//     token: string;
//   };
// }

// const InviteBoardPage = ({ params }: InviteBoardPageProps) => {
//   const router = useRouter();
//   // const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isValidating, setIsValidating] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const validateBoardInviteToken = async () => {
//       try {
//         setIsValidating(true);
//         const data = await fetcher({
//           url: "/invite/b/validate",
//           method: "POST",
//           data: {
//             token: params.token,
//           },
//         });
//         if (data && data.redirectUrl) {
//           router.push(data.redirectUrl);
//         } else {
//           setError("No redirect URL found in the response");
//         }
//       } catch (error) {
//         console.error("Error validating invite token:", error);
//         setError("Error validating invite token");
//       } finally {
//         setIsValidating(false);
//       }
//     };

//     const timer = setTimeout(() => {
//       validateBoardInviteToken();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [params.token, router]);

//   return (
//     <main className="relative h-full bg-black flex items-center justify-center">
//       <Scene  />

//       {error && (
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
//           <div className="text-white text-lg">{error}</div>
//         </div>
//       )}
//       <footer className="absolute bottom-0 left-0 w-full text-center text-white text-xs p-2">
//         Model "Robot Playground" by
//         <a
//           href="https://sketchfab.com/hadrien59"
//           target="_blank"
//           rel="noopener noreferrer">
//           Hadrien59
//         </a>{" "}
//         on{" "}
//         <a
//           href="https://sketchfab.com"
//           target="_blank"
//           rel="noopener noreferrer">
//           Sketchfab
//         </a>
//         , licensed under{" "}
//         <a
//           href="http://creativecommons.org/licenses/by/4.0/"
//           target="_blank"
//           rel="noopener noreferrer">
//           CC Attribution
//         </a>
//       </footer>
//     </main>
//   );
// };

// export default InviteBoardPage;

"use client";

import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
          url: "/invite/b/validate",
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

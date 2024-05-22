// "use client";

// import { Skeleton } from "@/components/ui/skeleton";
// // import { useOrganization } from "@clerk/nextjs";
// import { CreditCardIcon } from "lucide-react";
// import Image from "next/image";

// interface InfoProps {
//   isPro: boolean;
// }

// const Info = ({ isPro }: InfoProps) => {
//   // const { organization, isLoaded } = useOrganization();
//   if (!isLoaded) {
//     return <Info.Skeleton />;
//   }
//   return (
//     <div className="flex items-center gap-x-4 ">
//       <div className="w-[60px] h-[60px] relative">
//         <Image
//           fill
//           src={organization?.imageUrl!}
//           alt="organization"
//           className="rounded-md object-cover"
//         />
//       </div>
//       <div className="space-y-1">
//         <p className="font-semibold text-xl">{organization?.name}</p>
//         <div className="flex items-center text-xs text-muted-foreground">
//           <CreditCardIcon className="h-3 w-3 mr-1" />
//           {!isPro ? "Free" : "Pro"}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Info;

// Info.Skeleton = function SkeletonInfo() {
//   return (
//     <div className="flex items-center gap-x-4">
//       <div className="w-[60px] h-[60px] relative">
//         <Skeleton className="w-full h-full absolute" />
//       </div>
//       <div className="space-y-2">
//         <Skeleton className="w-[200px] h-2 " />
//         <div className="flex items-center">
//           <Skeleton className="w-4 h-4 mr-2" />
//           <Skeleton className="w-[100px] h-4" />
//         </div>
//       </div>
//     </div>
//   );
// };

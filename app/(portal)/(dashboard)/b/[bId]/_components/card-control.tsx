// "use client";

// import { useCardModal } from "@/hooks/use-card-modal";
// import { usePathname } from "next/navigation";
// import { useEffect } from "react";

// export const CardControl = () => {
//   const pathName = usePathname();
//   const cardId = useCardModal((state)=> state.id);
//   const openModal = useCardModal((state) => state.onOpen(cardId as string))
//   const onClose = useCardModal((state) => state.onClose())

//   useEffect(() => {
//     if (pathName.includes(`/b`)) {
//         onOpen()
//     } else {
//       cardModal.onClose();
//     }
//   }, [pathName]);

//   return null;
// };

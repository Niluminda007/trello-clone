// "use server";

// import { revalidatePath } from "next/cache";
// import { db } from "@/lib/db";

// import { createSafeAction } from "@/lib/create-safe-action";
// import { InputType, ReturnType } from "./types";
// import { StripeRedirect } from "./schema";
// import { absoluteUrl } from "@/lib/utils";
// import { stripe } from "@/lib/stripe";
// import { currentUser } from "@/lib/auth";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const user = await currentUser();
//   if (!user || user.workspaceId) {
//     return {
//       error: "Unautorized",
//     };
//   }
//   const settingsUrl = absoluteUrl(`/w/${user.workspaceId}`);
//   let url = "";

//   try {
//     const orgSubscription = await db.orgSubscription.findUnique({
//       where: {
//         orgId,
//       },
//     });

//     if (orgId && orgSubscription?.stripeCustomerId) {
//       const stripeSession = await stripe.billingPortal.sessions.create({
//         customer: orgSubscription.stripeCustomerId,
//         return_url: settingsUrl,
//       });

//       url = stripeSession.url;
//     } else {
//       const stripeSession = await stripe.checkout.sessions.create({
//         success_url: settingsUrl,
//         cancel_url: settingsUrl,
//         payment_method_types: ["card"],
//         mode: "subscription",
//         billing_address_collection: "auto",
//         customer_email: user.emailAddresses[0].emailAddress,
//         line_items: [
//           {
//             price_data: {
//               currency: "USD",
//               product_data: {
//                 name: "TaskVista Pro",
//                 description: "Unlimited boards for your organization",
//               },
//               unit_amount: 2000,
//               recurring: {
//                 interval: "month",
//               },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: {
//           orgId,
//         },
//       });
//       url = stripeSession.url || "";
//     }
//   } catch (error) {
//     return {
//       error: "Something went wrong",
//     };
//   }
//   revalidatePath(`/organizationId/${orgId}`);
//   return { data: url };
// };

// export const stripeRedirect = createSafeAction(StripeRedirect, handler);

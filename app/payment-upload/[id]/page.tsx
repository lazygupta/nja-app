// app/payment-upload/[id]/page.tsx

import PaymentUploadClient from "./paymentuploadclient";

// @ts-ignore
export default async function PaymentUploadPage({ params }) {
  const { id } = await params;
  return <PaymentUploadClient memberId={id} />;
}

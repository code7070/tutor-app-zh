import { endpointAPI } from "@/lib/utils";

export async function GET() {
  const appointments = await fetch(
    endpointAPI("appointments?fields[0]=documentId&populate=schedule"),
  ).then((res) => res.json());

  return Response.json({
    data: appointments,
    status: 200,
  });
}

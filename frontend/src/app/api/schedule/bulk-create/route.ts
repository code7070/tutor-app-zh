import { endpointAPI } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const paramsPos = searchParams.get("pos");
  const pos = parseInt(paramsPos ?? "0");
  const resTutors = (await (
    await fetch(endpointAPI("tutors?fields[0]=documentId&fields[1]=name"))
  ).json()) as { data: [{ id: number; documentId: string; name: string }] };
  const setlist = [
    // { date: "2025-01-29", time: "10:00:00" },
    // { date: "2025-01-29", time: "11:00:00" },
    // { date: "2025-01-29", time: "12:00:00" },
    // { date: "2025-01-29", time: "13:00:00" },
    // { date: "2025-01-29", time: "14:00:00" },
    // { date: "2025-01-29", time: "15:00:00" },
    // { date: "2025-01-29", time: "16:00:00" },
    // { date: "2025-01-29", time: "17:00:00" },
    // { date: "2025-01-29", time: "18:00:00" },
    // { date: "2025-01-29", time: "19:00:00" },
    // { date: "2025-01-29", time: "20:00:00" },
    { date: "2025-01-30", time: "10:00:00" },
    { date: "2025-01-30", time: "11:00:00" },
    { date: "2025-01-30", time: "12:00:00" },
    { date: "2025-01-30", time: "13:00:00" },
    { date: "2025-01-30", time: "14:00:00" },
    { date: "2025-01-30", time: "15:00:00" },
    { date: "2025-01-30", time: "16:00:00" },
    { date: "2025-01-30", time: "17:00:00" },
    { date: "2025-01-30", time: "18:00:00" },
    { date: "2025-01-30", time: "19:00:00" },
    { date: "2025-01-30", time: "20:00:00" },
    // { date: "2025-01-31", time: "10:00:00" },
    // { date: "2025-01-31", time: "11:00:00" },
    // { date: "2025-01-31", time: "12:00:00" },
    // { date: "2025-01-31", time: "13:00:00" },
    // { date: "2025-01-31", time: "14:00:00" },
    // { date: "2025-01-31", time: "15:00:00" },
    // { date: "2025-01-31", time: "16:00:00" },
    // { date: "2025-01-31", time: "17:00:00" },
    // { date: "2025-01-31", time: "18:00:00" },
    // { date: "2025-01-31", time: "19:00:00" },
    // { date: "2025-01-31", time: "20:00:00" },
    { date: "2025-02-01", time: "10:00:00" },
    { date: "2025-02-01", time: "11:00:00" },
    { date: "2025-02-01", time: "12:00:00" },
    { date: "2025-02-01", time: "13:00:00" },
    { date: "2025-02-01", time: "14:00:00" },
    { date: "2025-02-01", time: "15:00:00" },
    { date: "2025-02-01", time: "16:00:00" },
    { date: "2025-02-01", time: "17:00:00" },
    { date: "2025-02-01", time: "18:00:00" },
    { date: "2025-02-01", time: "19:00:00" },
    { date: "2025-02-01", time: "20:00:00" },
    // { date: "2025-02-02", time: "10:00:00" },
    // { date: "2025-02-02", time: "11:00:00" },
    // { date: "2025-02-02", time: "12:00:00" },
    // { date: "2025-02-02", time: "13:00:00" },
    // { date: "2025-02-02", time: "14:00:00" },
    // { date: "2025-02-02", time: "15:00:00" },
    // { date: "2025-02-02", time: "16:00:00" },
    // { date: "2025-02-02", time: "17:00:00" },
    // { date: "2025-02-02", time: "18:00:00" },
    // { date: "2025-02-02", time: "19:00:00" },
    // { date: "2025-02-02", time: "20:00:00" },
    { date: "2025-02-03", time: "10:00:00" },
    { date: "2025-02-03", time: "11:00:00" },
    { date: "2025-02-03", time: "12:00:00" },
    { date: "2025-02-03", time: "13:00:00" },
    { date: "2025-02-03", time: "14:00:00" },
    { date: "2025-02-03", time: "15:00:00" },
    { date: "2025-02-03", time: "16:00:00" },
    { date: "2025-02-03", time: "17:00:00" },
    { date: "2025-02-03", time: "18:00:00" },
    { date: "2025-02-03", time: "19:00:00" },
    { date: "2025-02-03", time: "20:00:00" },
    { date: "2025-02-04", time: "10:00:00" },
    { date: "2025-02-04", time: "11:00:00" },
    { date: "2025-02-04", time: "12:00:00" },
    { date: "2025-02-04", time: "13:00:00" },
    { date: "2025-02-04", time: "14:00:00" },
    { date: "2025-02-04", time: "15:00:00" },
    { date: "2025-02-04", time: "16:00:00" },
    { date: "2025-02-04", time: "17:00:00" },
    { date: "2025-02-04", time: "18:00:00" },
    { date: "2025-02-04", time: "19:00:00" },
    { date: "2025-02-04", time: "20:00:00" },
    { date: "2025-02-05", time: "10:00:00" },
    { date: "2025-02-05", time: "11:00:00" },
    { date: "2025-02-05", time: "12:00:00" },
    { date: "2025-02-05", time: "13:00:00" },
    { date: "2025-02-05", time: "14:00:00" },
    { date: "2025-02-05", time: "15:00:00" },
    { date: "2025-02-05", time: "16:00:00" },
    { date: "2025-02-05", time: "17:00:00" },
    { date: "2025-02-05", time: "18:00:00" },
    { date: "2025-02-05", time: "19:00:00" },
    { date: "2025-02-05", time: "20:00:00" },
  ];
  const tutorTarget = [resTutors.data[pos]];
  const payloadSchedule = tutorTarget.flatMap((tutor) => {
    return setlist.map((set) => {
      return {
        tutor: tutor.documentId,
        date: set.date,
        time: set.time,
        isBooked: false,
      };
    });
  });
  async function singleFetch(data: (typeof payloadSchedule)[0]) {
    return await fetch(endpointAPI("schedules"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
  }
  const fetches = await Promise.all(
    payloadSchedule.map(async (e) => await singleFetch(e)),
  ).then((res) => res.map((r) => r.json()));

  return Response.json({
    tutor: tutorTarget,
    res: fetches,
  });
}

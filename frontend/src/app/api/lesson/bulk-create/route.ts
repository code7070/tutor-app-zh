export async function GET() {
  const lessons = [
    {
      duration: 25,
      startTime: new Date("2024-01-20T09:00:00.000Z").toISOString(),
      statusLesson: "Not Started",
    },
    {
      duration: 50,
      startTime: new Date("2024-01-20T10:00:00.000Z").toISOString(),
      statusLesson: "Ongoing",
    },
    {
      duration: 25,
      startTime: new Date("2024-01-20T11:30:00.000Z").toISOString(),
      statusLesson: "Done",
    },
    {
      duration: 50,
      startTime: new Date("2024-01-20T13:00:00.000Z").toISOString(),
      statusLesson: "Cancel",
    },
    {
      duration: 25,
      startTime: new Date("2024-01-20T14:30:00.000Z").toISOString(),
      statusLesson: "Not Started",
    },
    {
      duration: 50,
      startTime: new Date("2024-01-20T15:00:00.000Z").toISOString(),
      statusLesson: "Ongoing",
    },
    {
      duration: 25,
      startTime: new Date("2024-01-20T16:30:00.000Z").toISOString(),
      statusLesson: "Done",
    },
    {
      duration: 50,
      startTime: new Date("2024-01-20T17:00:00.000Z").toISOString(),
      statusLesson: "Not Started",
    },
    {
      duration: 25,
      startTime: new Date("2024-01-20T18:30:00.000Z").toISOString(),
      statusLesson: "Cancel",
    },
    {
      duration: 50,
      startTime: new Date("2024-01-20T19:00:00.000Z").toISOString(),
      statusLesson: "Done",
    },
    {
      duration: 25,
      startTime: new Date("2024-01-20T20:30:00.000Z").toISOString(),
      statusLesson: "Ongoing",
    },
  ];

  return Response.json({ data: lessons });
}

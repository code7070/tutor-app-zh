import { endpointAPI } from "@/lib/utils";

export interface IResponseTutorSchedule {
  data: Data;
  status: number;
}

export interface Data {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  documentId: string;
  date: string;
  time: string;
  isBooked: boolean;
  appointment?: { documentId: string };
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const tutorId = (await params).id;
  // filters[tutor][documentId][$eq]=${tutorId}&lessons?fields[0]=id&fields[1]=documentId&fields[2]=start_time&fields[4]=statusLesson
  // populate[student][fields][0]=id&populate[student][fields][1]=documentId&
  const filter = `filters[tutor][documentId][$eq]=${tutorId}`;
  const columns = `schedules?fields[0]=id&fields[1]=documentId&fields[2]=date&fields[3]=time&fields[4]=isBooked`;
  const populate = `populate[appointment][fields][0]=documentId`;
  const endpoint = endpointAPI(`schedules?${filter}&${columns}&${populate}`);
  const res = await (await fetch(endpoint)).json();
  return Response.json({ data: res, status: 200 });
}

export interface ICreateAppointment {
  schedule: Schedule;
  appointment: Appointment;
}

export interface Schedule {
  data: Data;
  meta: Meta;
}

export interface Data {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  date: string;
  time: string;
  isBooked: boolean;
}

export interface Appointment {
  data: Data2;
  meta: Meta;
}

export interface Data2 {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  statusAppointment: string;
  doneAt: string;
  cancelAt: string;
  duration: string;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = (await req.json()) as { scheduleId: string; duration: string };
  const { scheduleId = "", duration = "" } = body;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const studentsId = [
    "vxfesjbzrgyy76p6eu45yhuy",
    "tnxe18de0axmtoqn1jl13z8x",
    "qbqfyaslx1bixlt6y2gktqe1",
    "kwmacdcsx7lym3g9novqzxuf",
  ];

  const randStudent = studentsId[Math.floor(Math.random() * studentsId.length)];

  const payloadSchedule = JSON.stringify({
    data: {
      isBooked: true,
    },
  });

  const payloadAppointment = JSON.stringify({
    data: {
      schedule: scheduleId,
      student: randStudent,
      tutor: (await params).id,
      duration: `dur${duration}`,
    },
  });

  const schedule = await (
    await fetch(endpointAPI(`schedules/${scheduleId}`), {
      headers,
      method: "PUT",
      body: payloadSchedule,
    })
  ).json();

  const appointment = await (
    await fetch(endpointAPI(`appointments`), {
      headers,
      method: "POST",
      body: payloadAppointment,
    })
  ).json();

  return Response.json({
    data: {
      schedule,
      appointment,
      success: schedule.data.documentId && appointment.data.documentId,
    },
    status: 200,
  });
}

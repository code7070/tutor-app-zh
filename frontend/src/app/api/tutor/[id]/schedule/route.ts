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

import { endpointAPI } from "@/lib/utils";

export interface IResponseLesson {
  data: Data;
  status: number;
}

interface Data {
  data: Lesson[];
  meta: Meta;
}

interface Lesson {
  id: number;
  documentId: string;
  duration: string;
  start_time: string;
  statusLesson: string;
  student: Relation;
  tutor: Relation;
}

interface Relation {
  id: number;
  documentId: string;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export async function GET() {
  // fields[0]=id&fields[1]=documentId&fields[2]=duration&fields[3]=start_time&fields[4]=statusLesson
  const path =
    "lessons?fields[0]=id&fields[1]=documentId&fields[2]=duration&fields[3]=start_time&fields[4]=statusLesson&populate[student][fields][0]=id&populate[student][fields][1]=documentId&populate[tutor][fields][0]=id&populate[tutor][fields][1]=documentId";
  const res = await (await fetch(endpointAPI(path))).json();
  return Response.json({
    data: res,
    status: 200,
  });
}

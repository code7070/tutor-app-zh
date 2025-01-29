import { endpointAPI } from "@/lib/utils";

export interface IResponseAppointmentDetail {
  data: Data;
  status: number;
}

interface Data {
  data: Data2;
  meta: { [key: string]: string | number | boolean };
}

interface Data2 {
  id: number;
  documentId: string;
  tutor: Tutor;
  schedule: Schedule;
  duration: "dur25" | "dur50";
}

interface Tutor {
  id: number;
  documentId: string;
  name: string;
  photo: { url: string };
  nativeLanguage?: string;
}

interface Schedule {
  id: number;
  documentId: string;
  date: string;
  time: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const appointmentId = (await params).id;
  const fields = `fields[0]=id&fields[1]=documentId&fields[2]=duration`;
  const tutor = `populate[tutor]=photo&populate[tutor][fields][0]=documentId&populate[tutor][fields][1]=name&populate[tutor][fields][2]=nativeLanguage`;
  const schedule = `populate[schedule][fields][0]=documentId&populate[schedule][fields][1]=date&populate[schedule][fields][2]=time`;
  const endpoint = endpointAPI(
    `appointments/${appointmentId}?${fields}&${tutor}&${schedule}`,
  );
  const res = await (await fetch(endpoint)).json();
  const tutorData = await fetch(
    endpointAPI(
      `tutors/${res.data.tutor.documentId}?fields[0]=documentId&fields[1]=name&fields[2]=nativeLanguage&populate=photo`,
    ),
  ).then((res) => res.json());
  return Response.json({
    data: {
      ...res,
      data: {
        ...res.data,
        tutor: {
          ...tutorData.data,
          photo: {
            ...tutorData.data.photo,
            url: `${process.env.MEDIA_ENDPOINT}${tutorData.data.photo.url}`,
          },
        },
      },
    },
    status: 200,
  });
}

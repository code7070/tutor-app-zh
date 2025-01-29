import {
  IResponseTutorDetail,
  IResponseTutorDetailRaw,
} from "@/lib/response-types";
import { endpointAPI } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const endpoint = endpointAPI(`/tutors/${(await params).id}?populate=*`);

  const res = (await fetch(endpoint).then((res) =>
    res.json(),
  )) as IResponseTutorDetailRaw;
  const fullRes: IResponseTutorDetail = {
    meta: res.meta,
    data: {
      id: res.data.id,
      documentId: res.data.documentId,
      name: res.data.name,
      countryOfBirth: res.data.countryOfBirth,
      nativeLanguage: res.data.nativeLanguage,
      feePerLesson: res.data.feePerLesson,
      experienceInYears: res.data.experienceInYears,
      bioHighlight: res.data.bioHighlight,
      bioLong: res.data.bioLong,
      rating: res.data.rating,
      isRefundable: res.data.isRefundable,
      isVerified: res.data.isVerified,
      photo: `${process.env.MEDIA_ENDPOINT}${res.data.photo.url}`,
      introVideo: `${res.data.introVideo}`,
    } as IResponseTutorDetail["data"],
  };

  return Response.json({
    data: fullRes,
    status: 200,
  });
}

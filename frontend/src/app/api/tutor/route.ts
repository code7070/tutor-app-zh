import { IResponseTutorsRaw } from "@/lib/response-types";
import { TSortTutor } from "@/lib/types";
import { endpointAPI } from "@/lib/utils";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const paramSort = searchParams.get("sort") ?? "relevance";
  const paramLang = searchParams.get("lang") ?? "all";
  const sort = paramSort as TSortTutor;

  const endpoint = endpointAPI("tutors?populate=*");
  const res = (await fetch(endpoint).then((res) =>
    res.json(),
  )) as IResponseTutorsRaw;

  const crafted = {
    meta: res.meta,
    data: res.data.map((i) => ({
      id: i.id,
      documentId: i.documentId,
      name: i.name,
      countryOfBirth: i.countryOfBirth,
      nativeLanguage: i.nativeLanguage,
      feePerLesson: i.feePerLesson,
      experienceInYears: i.experienceInYears,
      bioHighlight: i.bioHighlight,
      bioLong: i.bioLong,
      rating: i.rating,
      isRefundable: i.isRefundable,
      isVerified: i.isVerified,
      user_id: i.user_id,
      languagesSpoken: i.languagesSpoken,
      photo: `${i.photo.url}`,
      isSuperTutor: i.isSuperTutor,
    })),
  };

  if (sort === "price-lower")
    crafted.data = crafted.data.sort(
      (a, b) => (a.feePerLesson || 0) - (b.feePerLesson || 0),
    );
  else if (sort === "price-higher")
    crafted.data = crafted.data.sort(
      (a, b) => (b.feePerLesson || 0) - (a.feePerLesson || 0),
    );
  else if (sort === "rating")
    crafted.data = crafted.data.sort(
      (a, b) => (b.rating || 0) - (a.rating || 0),
    );

  if (paramLang && paramLang !== "all") {
    crafted.data = crafted.data.filter(
      (i) => i.nativeLanguage?.toLowerCase() === paramLang.toLowerCase(),
    );
  }

  return Response.json({ data: crafted, status: 200 });
}

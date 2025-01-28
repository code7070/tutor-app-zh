import { endpointAPI } from "@/lib/utils";

interface IRandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  nat: string;
  picture: { large: string; medium: string; thumbnail: string };
}

export async function GET() {
  const endpoint = endpointAPI("students");
  const randomUser: { results: IRandomUser[] } = await fetch(
    "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo",
  ).then((res) => res.json());
  // return Response.json({ randomUser });
  const pictureOnly = randomUser.results.map((user) => user.picture.large);
  const langList = ["EN", "ID", "CN", "ES", "JP", "FR", "KR"];
  const payloadStudents = randomUser.results.map((i) => ({
    name: `${i.name.first} ${i.name.last}`,
    preferLang: langList[Math.floor(Math.random() * langList.length)],
  }));
  const bulks = await Promise.all(
    payloadStudents.map(
      async (p) =>
        await (
          await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: p }),
          })
        ).json(),
    ),
  );
  const posts = bulks;

  return Response.json({
    pictureOnly,
    success: bulks.every((p) => p.ok),
    payloadStudents,
    posts,
  });
}

import { endpointAPI } from "@/lib/utils";

interface IRandomUser {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  login: {
    username: string;
    [key: string]: string;
  };
}

export async function GET() {
  const endpoint = endpointAPI("auth/local/register");
  const randomUser: { results: IRandomUser[] } = await fetch(
    "https://randomuser.me/api/?results=10&inc=login,email&noinfo",
  ).then((res) => res.json());
  // return Response.json({ randomUser });
  // const pictureOnly = randomUser.results.map((user) => user.picture.large);
  // const langList = ["EN", "ID", "CN", "ES", "JP", "FR", "KR"];
  const payloadUsers = randomUser.results.map((i) => ({
    username: i.login.username,
    email: i.email,
    password: "123456",
  }));
  const bulks = await Promise.all(
    payloadUsers.map(
      async (p) =>
        await (
          await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(p),
          })
        ).json(),
    ),
  );
  const posts = bulks;

  return Response.json({
    success: bulks.every((p) => p.ok),
    payloadUsers,
    posts,
  });
}

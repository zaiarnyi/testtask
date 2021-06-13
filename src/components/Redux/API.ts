export async function testTaskApi<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("лови ошибка");
  }
  return (await res.json()) as Promise<T>;
}

export async function userPostApi<T>(
  url: string,
  token: string,
  body: any
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    body,
    headers: {
      Token: token,
    },
  });
  if (!res.ok) {
    throw new Error("лови ошибка");
  }
  return (await res.json()) as Promise<T>;
}

export async function onRequest({ request, next }) {
  const response = await next();
  if (response.status === 404) {
    return new Response(response.body, {
      ...response,
      status: 200,
    });
  }
  return response;
}

export default async (request, context) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Mangler søk" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const apiKey = Deno.env.get("GOOGLE_PLACES_KEY");

  const googleUrl = `https://places.googleapis.com/v1/places:searchText`;

  const response = await fetch(googleUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount,places.id"
    },
    body: JSON.stringify({ textQuery: query })
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
};

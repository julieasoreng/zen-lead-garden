export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Mangler søk" });
  }

  const apiKey = process.env.GOOGLE_PLACES_KEY;

  const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.websiteUri,places.rating,places.userRatingCount,places.id,places.nationalPhoneNumber,places.internationalPhoneNumber"
    },
    body: JSON.stringify({ textQuery: query })
  });

  const data = await response.json();
  res.status(200).json(data);
}

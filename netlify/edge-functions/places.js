export default async (request, context) => {
  const apiKey = Deno.env.get("GOOGLE_PLACES_KEY");
  
  return new Response(JSON.stringify({ 
    keyExists: !!apiKey,
    keyLength: apiKey ? apiKey.length : 0,
    keyStart: apiKey ? apiKey.substring(0, 6) : "ingen"
  }), {
    headers: { "Content-Type": "application/json" }
  });
};

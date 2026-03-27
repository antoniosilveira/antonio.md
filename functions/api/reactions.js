// Pages Function: /api/reactions
// Handles GET (fetch counts) and POST (increment reaction)

const ALLOWED_EMOJIS = ['heart', 'fire', 'robot'];
const ALLOWED_ORIGIN = 'https://antonio.md';

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin === ALLOWED_ORIGIN ? ALLOWED_ORIGIN : '',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function sanitizeSlug(slug) {
  if (!slug) return null;
  // Only allow alphanumeric, hyphens, underscores
  const sanitized = slug.toLowerCase().replace(/[^a-z0-9\-_]/g, '');
  if (sanitized.length === 0 || sanitized.length > 100) return null;
  return sanitized;
}

export async function onRequestOptions(context) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(context.request.headers.get('Origin')),
  });
}

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  
  const post = sanitizeSlug(url.searchParams.get('post'));
  if (!post) {
    return new Response(JSON.stringify({ error: 'Invalid post slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  // Fetch all reaction counts for this post
  const counts = {};
  for (const emoji of ALLOWED_EMOJIS) {
    const value = await env.REACTIONS.get(`${post}:${emoji}`);
    counts[emoji] = parseInt(value || '0', 10);
  }

  return new Response(JSON.stringify(counts), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');

  const post = sanitizeSlug(url.searchParams.get('post'));
  const emoji = url.searchParams.get('emoji');

  if (!post) {
    return new Response(JSON.stringify({ error: 'Invalid post slug' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  if (!emoji || !ALLOWED_EMOJIS.includes(emoji)) {
    return new Response(JSON.stringify({ error: 'Invalid emoji type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
    });
  }

  // Increment the count
  const key = `${post}:${emoji}`;
  const current = parseInt(await env.REACTIONS.get(key) || '0', 10);
  const newCount = current + 1;
  await env.REACTIONS.put(key, newCount.toString());

  return new Response(JSON.stringify({ emoji, count: newCount }), {
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

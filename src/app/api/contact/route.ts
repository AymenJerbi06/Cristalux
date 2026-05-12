type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  topic?: unknown;
  orderNumber?: unknown;
  message?: unknown;
};

const topics = new Set(['buyer', 'order', 'wholesale', 'promotion', 'private-label', 'media']);

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null) as ContactPayload | null;

  if (!payload) {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const name = readString(payload.name);
  const email = readString(payload.email);
  const company = readString(payload.company);
  const topic = readString(payload.topic);
  const orderNumber = readString(payload.orderNumber);
  const message = readString(payload.message);

  if (name.length < 2) {
    return Response.json({ ok: false, error: 'Please enter your name.' }, { status: 400 });
  }

  if (!email.includes('@') || email.length < 5) {
    return Response.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!topics.has(topic)) {
    return Response.json({ ok: false, error: 'Please choose a valid inquiry topic.' }, { status: 400 });
  }

  if (topic === 'order' && orderNumber.length < 3) {
    return Response.json({ ok: false, error: 'Please include your order number.' }, { status: 400 });
  }

  if (message.length < 12) {
    return Response.json({ ok: false, error: 'Please add a little more detail to your message.' }, { status: 400 });
  }

  const reference = `CRX-${Date.now().toString(36).toUpperCase()}`;

  return Response.json({
    ok: true,
    reference,
    received: {
      name,
      email,
      company,
      topic,
      orderNumber,
      messageLength: message.length,
    },
  });
}

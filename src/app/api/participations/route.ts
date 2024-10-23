import { sql } from "@vercel/postgres";

interface TransportAssist {
  preferredPickupLocation: string;
}

type WeddingEvent = "bride-party" | "bride-ceremony" | "wedding-ceremony";
type Participation = {
  [key in WeddingEvent]?: TransportAssist;
};

interface ParticipationRequest {
  name: string;
  phoneNumber: string;
  email: string;
  participation?: Participation;
}

// eslint-disable-next-line
function validated(body: any): ParticipationRequest | undefined {
  const participation: Participation = {};
  const events: string[] = body.events ?? [];
  if (events.includes("bride-party")) {
    participation["bride-party"] = { preferredPickupLocation: "" };
  }
  if (events.includes("bride-ceremony")) {
    participation["bride-ceremony"] = { preferredPickupLocation: "" };
  }
  if (events.includes("wedding-ceremony")) {
    participation["wedding-ceremony"] = { preferredPickupLocation: "" };
  }
  return {
    name: body.fullName,
    phoneNumber: body.phoneNumber,
    email: body.email,
    participation,
  };
}

export async function POST(request: Request) {
  const body = await request.json().then(validated);
  if (!body) {
    return Response.json({}, { status: 400 });
  }
  console.log(body);
  try {
    const result = await sql`
    INSERT INTO wedding_participations 
      (phone_number, email, name, joining_bride_party, joining_bride_ceremony, joining_wedding_ceremony)
    VALUES 
      (${body.phoneNumber}, ${body.email}, ${body.name}, 
      ${"bride-party" in (body.participation ?? {})}, 
      ${"bride-ceremony" in (body.participation ?? {})}, 
      ${"wedding-ceremony" in (body.participation ?? {})})
    ON CONFLICT (phone_number, email)
    DO UPDATE SET 
      name = EXCLUDED.name,
      joining_bride_party = EXCLUDED.joining_bride_party,
      joining_bride_ceremony = EXCLUDED.joining_bride_ceremony,
      joining_wedding_ceremony = EXCLUDED.joining_wedding_ceremony;
  `;
    console.log(`Rows updated: ${result.rowCount}`);
    if (result.rowCount === null) {
      throw Error("Cannot execute query on DB");
    }
    return Response.json({ msg: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { detail: "Vui lòng điền lại mẫu xác nhận tham dự sau!" },
      { status: 400 }
    );
  }
}

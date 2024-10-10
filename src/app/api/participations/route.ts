import { createClient } from "@supabase/supabase-js";

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

export async function GET() {
  const supabase = createClient(
    process.env["SUPABASE_URL"] ?? "",
    process.env["SUPABASE_KEY"] ?? ""
  );
  const { data: files } = await supabase.storage
    .from("wedding-images")
    .list("public");
  const {
    data: { publicUrl: baseUrl },
  } = supabase.storage.from("wedding-images").getPublicUrl("public");

  return Response.json(files?.map(({ name }) => `${baseUrl}/${name}`) ?? []);
}

export async function POST(request: Request) {
  const body = await request.json().then(validated);
  if (!body) {
    return Response.json({}, { status: 400 });
  }
  console.log(body);
  const supabase = createClient(
    process.env["SUPABASE_URL"] ?? "",
    process.env["SUPABASE_KEY"] ?? ""
  );
  const insertResult = await supabase.from("wedding_participations").upsert(
    {
      phone_number: body.phoneNumber,
      email: body.email,
      name: body.name,
      joining_bride_party: "bride-party" in (body.participation ?? {}),
      joining_bride_ceremony: "bride-ceremony" in (body.participation ?? {}),
      joining_wedding_ceremony:
        "wedding-ceremony" in (body.participation ?? {}),
    },
    { onConflict: "phone_number, email" }
  );

  const error = insertResult.error;
  if (error === null) {
    return Response.json({ msg: "ok" }, { status: 200 });
  } else {
    console.error(error);
    return Response.json(
      { detail: "Vui lòng điền lại mẫu xác nhận tham dự sau!" },
      { status: 400 }
    );
  }
}

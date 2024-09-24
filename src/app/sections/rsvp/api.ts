const WeddingEvents = ["tiec-nha-gai", "le-vu-quy", "le-thanh-hon"] as const;
type WeddingEvent = typeof WeddingEvents[number];

export interface RSVPForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  events: WeddingEvent[];
}

export function bindRSVPForm(formData: FormData): RSVPForm {
  return {
    fullName: formData.get("fullName")?.toString() ?? "",
    phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    events: formData.getAll("events").map((ev) => ev as WeddingEvent),
  };
}

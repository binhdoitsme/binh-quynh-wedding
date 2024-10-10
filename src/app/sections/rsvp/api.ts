import axios from "axios";

const WeddingEvents = [
  "bride-party",
  "bride-ceremony",
  "wedding-ceremony",
] as const;
type WeddingEvent = (typeof WeddingEvents)[number];

export interface RSVPForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  events: WeddingEvent[];
}

export function bindRSVPForm(formData: FormData): [RSVPForm, string[]] {
  const data = {
    joining:
      formData.get("joining")?.toString() === undefined
        ? undefined
        : formData.get("joining")?.toString() === "yes",
    fullName: formData.get("fullName")?.toString() ?? "",
    phoneNumber: formData.get("phoneNumber")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    events: formData.getAll("events").map((ev) => ev as WeddingEvent),
  };
  const invalidFields = new Array<string>();
  if (!data.fullName) {
    invalidFields.push("fullName");
  }
  if (!data.phoneNumber || !/0[1-9]\d{8}/g.test(data.phoneNumber)) {
    invalidFields.push("phoneNumber");
  }
  if (!data.email || !/^\S+@\S+\.\S+$/g.test(data.email)) {
    invalidFields.push("email");
  }

  if (data.joining === undefined) {
    invalidFields.push("joining");
  } else if (data.joining && !data.events.length) {
    invalidFields.push("events");
  }
  return [data, invalidFields];
}

export function submitForm(form: RSVPForm, abortController: AbortController) {
  return axios.post("/api/participations", form, {
    signal: abortController.signal,
  });
}

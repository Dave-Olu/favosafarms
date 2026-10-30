import { submitPublicInquiry } from "../../../lib/inquiries";

export async function POST(request: Request) {
  return submitPublicInquiry(request, "contact");
}

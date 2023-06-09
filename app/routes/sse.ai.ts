import type { LoaderArgs } from "@remix-run/node";
import { fetchChatGPT } from "~/lib/chatgpt.server";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const userPrompt = url.searchParams.get("prompt");
  return fetchChatGPT({ userPrompt, stream: true });
}

import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { badRequest } from "remix-utils";
import { chatGPT } from "~/lib/chatgpt.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const prompt = formData.get("prompt");

  if (!prompt || typeof prompt !== "string") {
    throw badRequest({ message: "Bad prompt" });
  }

  return chatGPT({ prompt });
}

export default function Component() {
  const data = useActionData<typeof action>();

  return (
    <div>
      <h1>Welcome to Remix-AI</h1>
      <Form method="post">
        <label htmlFor="prompt">Prompt</label>
        <input id="prompt" name="prompt" type="text" required />
        <button>Ask</button>
      </Form>
      <div>
        {data?.choices[0]?.message && <p>{data.choices[0].message.content}</p>}
      </div>
    </div>
  );
}

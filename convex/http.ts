import { httpRouter, HttpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();


// 1 - Create a webhook endpoint from Clerk to Convex
// 2 - listen from Clerk for user.created event
// 3 - save user to db with clerkId

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhooksecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhooksecret) {
      throw new Error("Missing webhook secret");
    }

    // check headers
    const svix_id = request.headers.get("svix-id");
    const svix_timestamp = request.headers.get("svix-timestamp");
    const svix_signature = request.headers.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing headers", {
        status: 400,
      });
    }
    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(webhooksecret);

    // verify webhook
    try {
      wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (e) {
      return new Response("Invalid signature", {
        status: 400,
      });
    }
    const evt = payload;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        username,
        email_addresses,
        first_name,
        last_name,
        image_url,
      } = evt.data;
      const email = email_addresses[0].email_address;
      const name = `${first_name || ""} ${last_name || ""}`.trim();

      // johndoe@gmail.com ---->
      try {
        await ctx.runMutation(api.users.createUser, {
          email,
          fullname: name,
          image: image_url,
          clerkId: id,
          username: email.split("@")[0],
        });
      } catch (e) {
        console.log("Error creating user", e);
        return new Response("Error creating user", {
          status: 500,
        });
      }
    }
    return new Response("Webhook Processed successfully", { status: 200 });
  }),
});

export default http;


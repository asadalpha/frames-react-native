import { mutation, MutationCtx, QueryCtx } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    username: v.string(),
    fullname: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    image: v.string(),
    clerkId: v.string(),
    
  },
  handler: async (ctx, args) => {
    // check if user already exists

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    await ctx.auth.getUserIdentity();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // create user in the database
    await ctx.db.insert("users", {
      username: args.username,
      fullname: args.fullname,
      email: args.email,
      bio: args.bio,
      image: args.image,
      clerkId: args.clerkId,
      following: 0,
      followers: 0,
      posts: 0,
      
    });
  },
});

export async function getAuthenticatedUser(ctx:QueryCtx | MutationCtx){
  const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!currentUser) throw new Error("User not found");
    return currentUser;
}

// watch from ---- 2:38:55
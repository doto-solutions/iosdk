import {
  ErrorResponse,
  MoodReadResponse,
  PostCreateRequest,
  PostReadResponse,
} from "@newlife/newlife-creator-client-api";
import { omit } from "lodash";
import { debounce, pipe } from "overmind";
import { Action } from "../../../types";
import { Context } from "../state";

export const read: Action<{ id: string }> = async (
  { state, actions, effects },
  { id }
) => {
  const r = await state.api.client.post.postList({ id });
  if (!r.data) return;

  if (r.data?.author?.id) {
    actions.api.user.cache({ user: { ...r.data.author } });
  } // state.api.cache.users.by[r.data.author.id] =

  const isProcessing = /^processing$/i.test(
    state.api.cache.posts[id]?.contentUrl || ""
  );

  state.api.cache.posts[id] = omit(r.data, isProcessing ? ["contentUrl"] : []);
  actions.api.mood.cache({ moods: r.data.moods });
};

export const create: Action<
  { postForm: PostCreateRequest & { file: any } },
  PostReadResponse | void
> = async ({ state, actions, effects }, { postForm }) => {
  // await state.api.client.post.postCreate(post);
  const shouldUpload = !postForm.contentType;

  if (!shouldUpload) {
    if (!postForm.content)
      return effects.ux.notification.open({
        message: "Write something smart here.",
      });
    const p = await state.api.client.post.postCreate(postForm);
    return p.data;
  }

  try {
    const f = postForm.file[0];

    // const contentType = mime.lookup(extname(f.));
    if (!f.type) {
      return effects.ux.notification.open({
        message:
          "Unrecognized/unsupported content type. Upload something else.",
      });
    }

    const p = await state.api.client.post.postCreate(postForm);

    const uploadInfo = await state.api.client.post.uploadCreate({
      filename: f.name,
      targetId: p.data.id as string,
      contentType: f.type,
    });

    state.api.cache.posts[p.data.id ?? ""] = {
      p,
      contentUrl: "processing",
    } as PostReadResponse;

    const r = await fetch(uploadInfo.data.url as string, {
      method: "PUT",
      body: f,
    });

    if (r.status == 200) {
      effects.ux.notification.open({ message: "Success!" });
    } else
      effects.ux.notification.open({
        message: `The post was created but couldn't upload the file, error: ${await r.json()}`,
      });

    return p.data;
  } catch (ex) {
    // setErrMsg(get(ex, "error.errorMessage.details") || get(ex, "message") || "unknown error");
    effects.ux.notification.open({ message: "Somethink wend wronk!" });
  }
};

export const attachToMoods: Action<{
  moods: MoodReadResponse[];
  post: PostReadResponse;
}> = async ({ state, actions, effects }, { moods, post }) => {
  const pid = post.id || "";

  console.log("attachToMoods: enter");
  if (!pid || !moods?.length) {
    console.log("attachToMoods: no selection");
    return Promise.resolve();
  }
  console.log(`attachToMoods: adding ${moods.length} moods`);

  await Promise.all(
    moods
      .filter((m) => m.id)
      .map((m) =>
        state.api.client.mood.attachPostUpdate({
          id: m.id || "",
          targetId: pid,
        })
      )
  );

  console.log(`attachToMoods: caching ${moods.length} moods`);

  moods.map((m) => {
    actions.api.mood.cache({ moods: [m] });
  });

  console.log(`attachToMoods: done caching ${moods.length} moods`);

  return Promise.resolve();
};

export const rate: Action<{ post: PostReadResponse; amount: number }> = pipe(
  debounce(300),
  async ({ state, actions, effects }: Context, { post, amount }) => {
    const t = post.title || post.content || "";
    const mt = t.length <= 30 ? t : t.substring(0, 30) + "...";
    try {
      const res = await state.api.client.post.rateCreate({
        targetId: post.id,
        value: amount || 1,
        //@ts-ignore
        contextType: "tag",
        contextValue: "shoes",
      });
      effects.ux.message.info(`You voted ${amount}`);
    } catch (ex) {
      effects.ux.message.error(
        ((ex as any).error as ErrorResponse).errorMessage
      );
    }
  }
);

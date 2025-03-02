import { CreatorApi } from "@newcoin-foundation/core";
import {
  MoodReadResponse,
  PagedRatedResponseUser,
  PostReadResponse,
  UserReadPrivateResponse,
  UserReadPublicResponse,
} from "@newlife/newlife-creator-client-api";
import { derived } from "overmind";
import { AUTH_FLOW_STATUS, AUTH_FLOW_STATUS_TYPE } from "../auth/state";

export const api: CreatorApi = <CreatorApi>{};

export type PowerupsCacheItem = {
  in: PagedRatedResponseUser;
  out: PagedRatedResponseUser;
};
export type PowerupsCache = Record<string, PowerupsCacheItem>;

type State = {
  client: CreatorApi;
  auth: {
    // newlife
    status: AUTH_FLOW_STATUS_TYPE;
    user: UserReadPrivateResponse | null;
    moods: MoodReadResponse[];
    authorized: boolean;
    admitted: boolean;
    userDisplayHandler: string;
    attempted: boolean;
  };
  cache: {
    users: {
      byUsername: Record<
        string,
        UserReadPublicResponse & { moods?: MoodReadResponse[] }
      >;
      byId: Record<
        string,
        UserReadPublicResponse & { moods?: MoodReadResponse[] }
      >;
    };
    powerups: PowerupsCache;
    posts: Record<string, PostReadResponse>;
    moods: Record<string, MoodReadResponse & { promise?: Promise<any> | null }>;
    stakeHistory: {
      user: UserReadPublicResponse;
      amount: string;
      response: any;
      error: any;
    }[];
  };
  // post: Record<string, PostReadResponse>
};
type AuthorizedUserState = State["auth"];

export default {
  client: api,

  auth: {
    // newlife
    user: null,
    moods: [],
    status: AUTH_FLOW_STATUS.ANONYMOUS,
    attempted: false,
    userDisplayHandler: derived((state: AuthorizedUserState, rs: any) => {
      return (
        state.user?.username ||
        (rs.firebase.user?.phoneNumber || "") + (state.user?.id ? "*" : "")
      );
    }),
    authorized: derived(
      (s: AuthorizedUserState, rs: any) =>
        rs.auth.status >= AUTH_FLOW_STATUS.AUTHORIZED
    ),
    admitted: derived((s: AuthorizedUserState) =>
      ["admitted", "registered"].includes(s.user?.status || "")
    ),
  },

  cache: {
    posts: {},
    moods: {},
    users: {
      byId: {},
      byUsername: {},
    },
    powerups: {},
    stakeHistory: [],
  },
  // post: derived((state: State) => (id: string) => state._posts[id] || actions.getPost(id) )
} as State;

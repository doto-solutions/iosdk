import { notification, message } from "antd";
import { Action } from "../../types";
import { pipe, debounce, filter, json, derived } from "overmind";
import { Context } from "../overmind";
import websocket, { WSState } from "./effects";
import { state } from "../auth/state";
import { get, uniq } from "lodash";
import { PostReadResponse, UserReadPrivateResponse } from "@newlife/newlife-creator-client-api";
import { newlifeWebsocketsServer } from "../../config";
import { capFirst } from "../../utils/capFirst";

const toggleWebSocket: Action =
    pipe(
        debounce(500),
        async ({ state, effects, actions }: Context) => {
            if(!state.api.auth.authorized)
                return;

            const token = state.firebase.token;
            effects.websockets.newlife.toggle(token)

            if (!token || !effects.websockets.newlife.socket)
                return

            const res = (await state.api.client.user.activityStreamList()) || { data: { Items: [] } };

            const items = [...(((res.data || {}) as any).Items || [])].reverse();
            items.forEach((ev: any) => actions.websockets.processIncoming({ msg: JSON.stringify(ev) }));

            effects.websockets.newlife.socket!.addEventListener('message', (ev) => {
                if(ev.data === "pong")
                    return;
                    
                actions.websockets.processIncoming({ msg: ev.data });
                // state.websockets.messages.incoming.push(ev.data);
                // effects.ux.notification.open({ message: ev.data });
            });
        }
    )

type WsEvent = {
    type: "modelUpdated",
    model: "user" | "post" | "mood",
    payload: any,
    // updatedProps: string[],
    updated: string
} |
{
    type: "newcoin",
    updated: string,
    payload: {
        message: string,
        amount: number
    }
}

type ActivityStreamEvent = {
    title: string,
    link: string,
    description: string,
    seen?: boolean,
    original: any
}

type NewcoinEvent = {
    payload: { message: 'stake_received' | 'stake_sent', txid: string }
    recipient: string
    type: string
    updated: string,
    original: any
}


const processIncomingNewcoin: Action<{ event: WsEvent }> = //({ reaction, actions, state }, { msg })
    pipe(
        filter((_, { event: { type } }) => type === 'newcoin'),
        // filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
        ({ state, effects }, { event }) => {
            const msg = event.payload.message;
            const msgCore = msg.replace(/_/, " ");
            const asMsg = {
                title: event.updated + " newcoin: " + msgCore,
                link: ``,
                description: msg.error || `You ${msgCore.split(/_/)[1]} some stake.`,
                original: event
            };

            // effects.ux.message.info(msgCore);

            state.websockets.messages.activityStream.unshift(asMsg);
            state.websockets.messages.newcoin.unshift(asMsg);
        }
    );

const modelProcessors = {
    user: ({ state, actions }: Context, u: UserReadPrivateResponse) => {
        const curr = state.api.cache.users.byId[u.id ?? ""];
        actions.api.user.cache({ user: { ...curr, ...u }});
        // state.api.cache.users.byId[u.id ?? ""] = { ...state.api.cache.users.byId[u.id ?? ""], ...u };
        // state.api.cache.users.byUsername[u.username ?? ""] = { ...state.api.cache.users.byUsername[u.username ?? ""], ...u };

        (state.api.auth.user?.id === u.id) && 
            Object.assign(state.api.auth.user, { ...u });
    },
    post: ({ actions, state }: Context, p: PostReadResponse) => {
        state.api.cache.posts[p.id ?? ""] = { ...state.api.cache.posts[p.id ?? ""], ...p };
    },
    mood: () => {}
}

const processIncomingModelUpdated: Action<{ event: WsEvent & { type: "modelUpdated" } }> = //({ reaction, actions, state }, { msg })
    pipe(
        filter((_, { event: { type } }) => type === 'modelUpdated'),
        // filter((_, { event: { payload } }) => (get(payload, "inbound.0.value.label") != "session")),
        (ctx, { event }) => {
            const { state } = ctx;
            const model = event.model === "user" ? "profile" : event.model;
            const what = capFirst(model);

            modelProcessors[event.model] && modelProcessors[event.model](ctx, event.payload.value);

            const inRels = event.payload.inbound?.filter(Boolean);
            const outRels = event.payload.outbound?.filter(Boolean);
            const rels: string[] = uniq<string>([
                ...(inRels || []).map((r: any) => r.value.label),
                // ...(outRels || []).map((r: any) => r.value.label)
            ]).filter(Boolean);

            if (rels.length == 1 && rels[0] === "session")
                return;

            const asMsg = {
                title: event.updated + " " + what + " updated",
                link: `/${event.model}/${event.payload.value.id}`,
                description: !rels.length ?
                    `Your ${what.toLowerCase()} got updated: ${(event.payload.updatedProps || []).join(", ")}` :
                    `${what}'s ${rels.join(", ")} got updated.`,
                original: event
            };

            return state.websockets.messages.activityStream.unshift(asMsg);
        }
    )

const processIncoming: Action<{ msg: any }> = ({ reaction, actions, state }, { msg }) => {
    try {
        const ev = JSON.parse(msg);
        // state.websockets.messages.incoming.unshift(ev)
        actions.websockets.processIncomingModelUpdated({ event: ev });
        actions.websockets.processIncomingNewcoin({ event: ev });
        // state.websockets.messages.activityStream.unshift({ ... })

        // ev.type === "modelUpdated"
    } catch (ex) {
        // unparseable?
    }
}
// const onInitializeOvermind: Action = ({ reaction, actions }) => {
//     reaction(
//         (st) => st.auth.user,
//         (id) => id && actions.websockets.toggleWebSocket()
//     )

// }

const actions = {
    // onInitializeOvermind,
    toggleWebSocket,
    processIncoming,
    processIncomingModelUpdated,
    processIncomingNewcoin
};

type WebsocketsState = {
    state: {
        socket: WebSocket | null,
        url: string,
        messages: {
            incoming: any[],
            activityStream: ActivityStreamEvent[],
            newcoin: NewcoinEvent[]
        }
    },
    actions: typeof actions,
    effects: {
        newlife: WSState
    }
}

export default {
    state: {
        socket: null,
        url: newlifeWebsocketsServer,
        messages: {
            incoming: [],
            activityStream: [],
            newcoin: []
        }
    },
    actions,
    effects: {
        newlife: websocket((token) => `${newlifeWebsocketsServer}?token=${token}`)
    }
} as WebsocketsState;
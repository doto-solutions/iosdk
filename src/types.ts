import {
	Api,
} from "@newlife/newlife-creator-client-api";
import React from "react";
import { Context } from "./overmind/overmind";

export class CreatorApi extends Api<{ token: string }> { }

export type NLView<T = {}> = React.FC<React.PropsWithChildren<T>>;
export type GenericComponent = NLView<any> | React.FC<any>;


export type Action<T = undefined, R = void> = (
	context: Context,
	value: T
) => R | Promise<R>;

export interface Link {
	url?: string;
	text: string;
}

export type EmbeddableControlNextCommand = (args?: {
	command: () => void;
	text: string;
}) => void;
export type EmbeddableControl = {
	embedded?: boolean;
	setNext?: EmbeddableControlNextCommand;
	setIsErrorSubmit?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Timer = ReturnType<typeof setInterval>;
export type EventHandler = (e?: KeyboardEvent | MouseEvent) => void;
export type Callback = (e?: any) => void;

export type ActiveKey = "0" | "1" | "2" | "3";


export type FirebaseConfig = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
	measurementId: string;
}

// export interface UserInfo {
// 	status?: string;
// 	token?: string;
// 	user?: UserReadPrivateResponse;
// 	fbUser?: UserCredential;
// 	loading?: boolean;
// 	signOut: () => void;
// }

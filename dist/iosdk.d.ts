/// <reference types="@stripe/stripe-js/types/stripe-js/checkout" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/base" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-number" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-expiry" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/card-cvc" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/iban" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/ideal-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/fpx-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/payment-request-button" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/au-bank-account" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/eps-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/p24-bank" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/affirm-message" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/afterpay-clearpay-message" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/payment" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/link-authentication" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements/shipping-address" />
/// <reference types="@stripe/stripe-js/types/stripe-js/payment-intents" />
/// <reference types="@stripe/stripe-js/types/stripe-js/setup-intents" />
/// <reference types="@stripe/stripe-js/types/stripe-js/payment-request" />
/// <reference types="@stripe/stripe-js/types/stripe-js/token-and-sources" />
/// <reference types="@stripe/stripe-js/types/api/shared" />
/// <reference types="@stripe/stripe-js/types/api/PaymentMethods" />
/// <reference types="@stripe/stripe-js/types/api/PaymentIntents" />
/// <reference types="@stripe/stripe-js/types/api/SetupIntents" />
/// <reference types="@stripe/stripe-js/types/api/Sources" />
/// <reference types="@stripe/stripe-js/types/api/Tokens" />
/// <reference types="@stripe/stripe-js/types/api/BankAccounts" />
/// <reference types="@stripe/stripe-js/types/api/Cards" />
/// <reference types="@stripe/stripe-js/types/api/VerificationSessions" />
/// <reference types="@stripe/stripe-js" />
/// <reference types="@stripe/stripe-js/types/stripe-js/elements" />
/// <reference types="@stripe/stripe-js/types/stripe-js" />
/// <reference types="@stripe/react-stripe-js" />
import { App } from "./App";
import { overmind } from "./overmind";
export { App };
export { overmind };
declare const _default: {
    App: import("./types").NLView<{
        config?: import("type-fest/source/partial-deep").PartialObjectDeep<{
            settings: {
                firebaseConfig: import("./types").FirebaseConfig;
                newlife: {
                    baseUrl: string;
                    mediaBucket: any;
                    websocketsServer: any;
                };
            };
            components: {
                layout: {
                    Layout: import("./types").GenericComponent;
                    TopMenu: import("./types").GenericComponent;
                };
                auth: {
                    AuthWidget: import("./types").GenericComponent;
                };
                icons: {
                    Logo: import("./types").GenericComponent;
                };
            };
        }> | undefined;
        custom?: any;
    }>;
    overmind: (cfg?: import("type-fest/source/partial-deep").PartialObjectDeep<{
        settings: {
            firebaseConfig: import("./types").FirebaseConfig;
            newlife: {
                baseUrl: string;
                mediaBucket: any;
                websocketsServer: any;
            };
        };
        components: {
            layout: {
                Layout: import("./types").GenericComponent;
                TopMenu: import("./types").GenericComponent;
            };
            auth: {
                AuthWidget: import("./types").GenericComponent;
            };
            icons: {
                Logo: import("./types").GenericComponent;
            };
        };
    }> | undefined) => import("overmind").Overmind<{
        state: import("overmind/lib/internalTypes").SubType<{
            custom: {
                info: string;
            };
            indicators: {
                _isWorking: number;
                isWorking: boolean;
                _specific: Record<string, number>;
                specific: Record<string, any>;
            };
            auth: import("./overmind/auth/state").State;
            routing: {
                preLoginRoute: string;
                breadcrumbs: import("./types").Link[];
                history: import("history").History<unknown>;
                backHistory: {
                    pathname: string;
                    search: string;
                }[];
                simpleHistory: {
                    pathname: string;
                    search: string;
                }[];
                location: string;
                isAllowed: boolean;
            };
            firebase: {
                token: string;
                user: import("@firebase/auth").User | null;
            };
            websockets: {
                socket: WebSocket | null;
                url: string;
                messages: {
                    incoming: any[];
                    activityStream: {
                        title: string;
                        link: string;
                        description: string;
                        seen?: boolean | undefined;
                        original: any;
                    }[];
                    newcoin: {
                        payload: {
                            message: "stake_received" | "stake_sent";
                            txid: string;
                        };
                        recipient: string;
                        type: string;
                        updated: string;
                        original: any;
                    }[];
                };
            };
            payments: unknown;
            evm: unknown;
            ux: unknown;
            chromeext: unknown;
            config: {
                settings: {
                    firebaseConfig: import("./types").FirebaseConfig;
                    newlife: {
                        baseUrl: string;
                        mediaBucket: any;
                        websocketsServer: any;
                    };
                };
                components: {
                    layout: {
                        Layout: import("./types").GenericComponent;
                        TopMenu: import("./types").GenericComponent;
                    };
                    auth: {
                        AuthWidget: import("./types").GenericComponent;
                    };
                    icons: {
                        Logo: import("./types").GenericComponent;
                    };
                };
            };
            api: {
                client: import("./types").CreatorApi;
                auth: {
                    status: import("./overmind/auth/state").AUTH_FLOW_STATUS_TYPE;
                    user: import("@newlife/newlife-creator-client-api").UserReadPrivateResponse | null;
                    moods: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                    authorized: boolean;
                    admitted: boolean;
                    userDisplayHandler: string;
                    attempted: boolean;
                };
                cache: {
                    users: {
                        byUsername: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                            moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[] | undefined;
                        }>;
                        byId: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse & {
                            moods?: import("@newlife/newlife-creator-client-api").MoodReadResponse[] | undefined;
                        }>;
                    };
                    powerups: import("./overmind/api/state").PowerupsCache;
                    posts: Record<string, import("@newlife/newlife-creator-client-api").PostReadResponse>;
                    moods: Record<string, import("@newlife/newlife-creator-client-api").MoodReadResponse & {
                        promise?: Promise<any> | null | undefined;
                    }>;
                    stakeHistory: {
                        user: import("@newlife/newlife-creator-client-api").UserReadPublicResponse;
                        amount: string;
                        response: any;
                        error: any;
                    }[];
                };
            };
            lists: {
                creativeSearch: {
                    results: {
                        _items: Record<string, {
                            image?: string | undefined;
                            meta?: {
                                date?: string | undefined;
                                summary?: string | undefined;
                                id?: number | undefined;
                                blog_name?: string | undefined;
                                tags?: string[] | undefined;
                                short_url?: string | undefined;
                            } | undefined;
                            aesthetics?: object | undefined;
                            content?: object | undefined;
                        }>;
                        items: {
                            image?: string | undefined;
                            meta?: {
                                date?: string | undefined;
                                summary?: string | undefined;
                                id?: number | undefined;
                                blog_name?: string | undefined;
                                tags?: string[] | undefined;
                                short_url?: string | undefined;
                            } | undefined;
                            aesthetics?: object | undefined;
                            content?: object | undefined;
                        }[];
                        sortKey: string;
                        page: number;
                    };
                    tags: {
                        _items: Record<string, string>;
                        items: string[];
                        sortKey: string;
                        page: number;
                    };
                    lastQueried: {
                        tags: string;
                        aesthetics: string;
                    };
                    isActive: boolean;
                };
                top: {
                    moods: {
                        _items: Record<string, import("@newlife/newlife-creator-client-api").MoodReadResponse>;
                        items: import("@newlife/newlife-creator-client-api").MoodReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                    users: {
                        _items: Record<string, import("@newlife/newlife-creator-client-api").UserReadPublicResponse>;
                        items: import("@newlife/newlife-creator-client-api").UserReadPublicResponse[];
                        sortKey: string;
                        page: number;
                    };
                    posts: {
                        _items: Record<string, import("@newlife/newlife-creator-client-api").PostReadResponse>;
                        items: import("@newlife/newlife-creator-client-api").PostReadResponse[];
                        sortKey: string;
                        page: number;
                    };
                };
                search: {
                    users: {
                        query: string;
                        results: import("@newlife/newlife-creator-client-api").UserPagedListReadPublicResponse | null;
                    };
                };
            };
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: {
                        form: Partial<import("@newlife/newlife-creator-client-api").UserCreateRequest>;
                        justCreated: boolean;
                        legacyToken: string;
                        formUsernameIsAvailable: "" | "available" | "checking" | "unavailable";
                        wizard: ({
                            current: "SELECT_DOMAIN";
                            hasNext: boolean;
                            hasPrev: false;
                        } | {
                            current: "AUTHENTICATE";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "SUBSCRIBE";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "CREATE_USER";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "DONE";
                            hasNext: false;
                            hasPrev: false;
                        }) & {
                            current: string;
                            hasNext: boolean;
                            hasPrev: boolean;
                        } & import("overmind/lib/statemachine").MachineMethods<{
                            current: "SELECT_DOMAIN";
                            hasNext: boolean;
                            hasPrev: false;
                        } | {
                            current: "AUTHENTICATE";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "SUBSCRIBE";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "CREATE_USER";
                            hasNext: boolean;
                            hasPrev: boolean;
                        } | {
                            current: "DONE";
                            hasNext: false;
                            hasPrev: false;
                        }, {
                            type: "NEXT";
                            data: import("./overmind/flows/user/create/wizardStateMachine").WizardInput;
                        } | {
                            type: "PREV";
                            data: import("./overmind/flows/user/create/wizardStateMachine").WizardInput;
                        } | {
                            type: "UPDATE";
                            data: import("./overmind/flows/user/create/wizardStateMachine").WizardInput;
                        }, {
                            current: string;
                            hasNext: boolean;
                            hasPrev: boolean;
                        }>;
                    };
                }, object>;
                rating: {
                    _value: number;
                    value: number;
                    startTime: number;
                    isRating: boolean;
                    rated: boolean;
                    interval: {
                        start: (f: import("./types").EventHandler) => void;
                        stop: () => void;
                    };
                    keyBinding: {
                        remove: () => void;
                        setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                            onKeyUp: import("./types").EventHandler;
                            onKeyDown: import("./types").EventHandler;
                        }) => void;
                    };
                };
            }, object>;
            newcoin: {
                account: any;
                pools: any;
                cache: {
                    accountHistory: Record<string, import("./overmind/newcoin/types").HyperionAccountHistory>;
                    pools: {
                        byCode: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                        byOwner: Record<string, import("@newcoin-foundation/newcoin-sdk").NCPoolsInfo>;
                    };
                };
            };
        }, object>;
        effects: import("overmind/lib/internalTypes").SubType<{
            custom: {
                info: () => void;
            };
            indicators: unknown;
            auth: typeof import("./overmind/auth/effects");
            routing: {};
            firebase: {
                initialize(firebaseConfig: import("@firebase/app").FirebaseOptions): import("@firebase/auth").Auth;
                initRecaptchaVerifier(containerOrId?: string | HTMLElement): void;
                clearRecaptchaVerifier: () => void;
                requestPhoneAuthCode(v: {
                    phone: string;
                }): Promise<import("@firebase/auth").ConfirmationResult>;
                requestEmailAuthCode(v: {
                    email: string;
                }): Promise<void>;
                signInWithEmailLink(email: string, emailLink: string): Promise<void>;
                submitPhonVerificationCode(v: {
                    phoneVerificationCode: string;
                }): Promise<import("@firebase/auth").UserCredential | undefined>;
                logout(): Promise<void>;
            };
            websockets: {
                newlife: import("./overmind/websockets/effects").WSState;
            };
            payments: unknown;
            evm: typeof import("./overmind/evm/effects");
            ux: {
                notification: import("antd/lib/notification").NotificationApi;
                message: import("antd/lib/message").MessageApi;
            };
            chromeext: {};
            config: unknown;
            api: {
                initialize(): import("./types").CreatorApi;
                updateToken(token: string): void;
                authorize(): Promise<import("@newlife/newlife-creator-client-api").UserReadPrivateResponse>;
            };
            lists: {};
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: {};
                }, object>;
                rating: {
                    initInterval: (ms: number) => {
                        start: (f: import("./types").EventHandler) => void;
                        stop: () => void;
                    };
                    onceKeyBinding: (keyCodes: number[]) => {
                        remove: () => void;
                        setEventHandlers: ({ onKeyUp: oku, onKeyDown: okd }: {
                            onKeyUp: import("./types").EventHandler;
                            onKeyDown: import("./types").EventHandler;
                        }) => void;
                    };
                };
            }, object>;
            newcoin: typeof import("./overmind/newcoin/effects");
        }, object>;
        actions: import("overmind/lib/internalTypes").SubType<{
            custom: {
                info: () => void;
            };
            indicators: {
                isWorking: import("./types").Action<{
                    actionName: string;
                    n: number;
                }, void>;
                isWorkingActionDebounced: import("./types").Action<{
                    actionName: string;
                }, void>;
            };
            auth: typeof import("./overmind/auth/actions");
            routing: typeof import("./overmind/routing/actions");
            firebase: typeof import("./overmind/firebase/actions");
            websockets: {
                toggleWebSocket: import("./types").Action<undefined, void>;
                processIncoming: import("./types").Action<{
                    msg: any;
                }, void>;
                processIncomingModelUpdated: import("./types").Action<{
                    event: {
                        type: "modelUpdated";
                        model: "user" | "mood" | "post";
                        payload: any;
                        updated: string;
                    } & {
                        type: "modelUpdated";
                    };
                }, void>;
                processIncomingNewcoin: import("./types").Action<{
                    event: {
                        type: "modelUpdated";
                        model: "user" | "mood" | "post";
                        payload: any;
                        updated: string;
                    } | {
                        type: "newcoin";
                        updated: string;
                        payload: {
                            message: string;
                            amount: number;
                        };
                    };
                }, void>;
            };
            payments: {
                pay: import("./types").Action<{
                    stripe?: import("@stripe/stripe-js").Stripe | null | undefined;
                    elements?: import("@stripe/stripe-js").StripeElements | null | undefined;
                }, void>;
            };
            evm: typeof import("./overmind/evm/actions");
            ux: {
                showNotification: import("./types").Action<{
                    message: string;
                    duration?: number | undefined;
                }, void>;
            };
            chromeext: typeof import("./overmind/chromeext/actions");
            config: unknown;
            api: {
                onInitializeOvermind: import("./types").Action<undefined, void>;
                auth: typeof import("./overmind/api/actions/auth");
                user: typeof import("./overmind/api/actions/user");
                mood: typeof import("./overmind/api/actions/mood");
                post: typeof import("./overmind/api/actions/post");
            };
            lists: {
                creativeSearch: import("./types").Action<{
                    tags: string;
                    aesthetics: string;
                }, void>;
                searchUsers: import("./types").Action<{
                    query: string;
                }, void>;
                top: {
                    moods: import("./types").Action<undefined, void>;
                    users: import("./types").Action<undefined, void>;
                    posts: import("./types").Action<undefined, void>;
                };
            };
            flows: import("overmind/lib/internalTypes").SubType<{
                user: import("overmind/lib/internalTypes").SubType<{
                    create: typeof import("./overmind/flows/user/create/actions");
                }, object>;
                rating: {
                    deepLikeInit: import("./types").Action<undefined, void>;
                    deepLikeStart: import("./types").Action<{
                        event?: Event | undefined;
                    }, void>;
                    deepLikeStep: import("./types").Action<undefined, void>;
                    deepLikeStop: import("./types").Action<undefined, void>;
                    onInitializeOvermind: import("./types").Action<undefined, void>;
                };
            }, object>;
            newcoin: typeof import("./overmind/newcoin/actions");
        }, object>;
    }>;
};
export default _default;

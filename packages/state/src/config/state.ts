import React from "react";
import { FirebaseConfig } from "@newcoin-foundation/core";

type OptionalElement = React.ReactElement | null;

export const state = {
  settings: {
    firebaseConfig: {} as FirebaseConfig,
    newlifeBaseUrl: "",
    newlifeMediaBucket: "",
    newlifeWebsocketsServer: "",
  },
  components: {
    layout: {
      Layout: null as OptionalElement,
      TopMenu: null as OptionalElement,
    },
    auth: {
      AuthWidget: null as OptionalElement,
    },
    icons: {
      Logo: null as OptionalElement,
    },
  },
};

// indicators: {
//     _inProgressCounter: 0,
//     inProgress: derived<{ _inProgressCounter: number }, {}, boolean>((state) => state._inProgressCounter > 0)
// },
// flows

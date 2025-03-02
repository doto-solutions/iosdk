// import Logo from "./Components/Icons/Logo";
// import { Layout, TopMenu } from "./Layout";
// import { AuthWidget } from "./Pages/AuthWidget";
import { FirebaseConfig, GenericComponent } from "./types";

const currentHost =
  window.location.hostname === "localhost"
    ? "web-dev.newlife.io"
    : window.location.hostname;

const stages: Record<string, string> = {
  "web-dev.newlife.io": "eu-dev",
  "test.newlife.io": "eu-sit",
  "web.newlife.io": "eu-prod",
  "www.newlife.io": "eu-prod",
  "newlife.io": "eu-prod",
  "web-dev.unsid.org": "eu-dev",
};
const stage = stages[currentHost];

const newlifeBaseUrls: Record<string, string> = {
  "eu-dev": "https://api-eu-dev.newlife.io/creator",
  "eu-sit": "https://api-eu-sit.newlife.io/creator",
  "eu-prod": "https://api-eu-prod.newlife.io/creator",
};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigs: Record<string, FirebaseConfig> = {
  "eu-dev": {
    apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
    authDomain: "newlifeio.firebaseapp.com",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: "360722214510",
    appId: "1:360722214510:web:d088a1e106fef50262007f",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-sit": {
    apiKey: "AIzaSyD-OLxk7rwlY3qqsHlFff7fYFQ2xmW78ZM",
    authDomain: "newlifeio.firebaseapp.com",
    projectId: "newlifeio",
    storageBucket: "newlifeio.appspot.com",
    messagingSenderId: "360722214510",
    appId: "1:360722214510:web:d088a1e106fef50262007f",
    measurementId: "G-PJWYRPZSNM",
  },
  "eu-prod": {
    apiKey: "AIzaSyAv5KoJ2S0ZCj-n45hILx7XsTT4irt6w8c",
    authDomain: "newlifeio-prod.firebaseapp.com",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: "666370792765",
    appId: "1:666370792765:web:02c694986693a8ae54f954",
    measurementId: "G-YMT320RGLJ",
  },
  v1: {
    apiKey: "AIzaSyAwMWXd0V5zEvNHBwyY8Cbe-OYG5PF9Qu8",
    authDomain: "newlifeio-prod.firebaseapp.com",
    projectId: "newlifeio-prod",
    storageBucket: "newlifeio-prod.appspot.com",
    messagingSenderId: "666370792765",
    appId: "1:666370792765:web:02c694986693a8ae54f954",
    measurementId: "G-YMT320RGLJ",
  },
};

const newlifeMediaBuckets: Record<string, any> = {
  "eu-dev": `https://eu-dev-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
  "eu-sit": `https://eu-sit-creator-api-cdn.s3.eu-west-1.amazonaws.com`,
  "eu-prod": `https://eu-prod-creator-api-cdn.s3.eu-west-1.amazonaws.com`, // images/${sizer}${src}
};

const newlifeWebsocketsServers: Record<string, any> = {
  "eu-dev": `wss://wsapi-eu-dev.newlife.io/creator`,
  "eu-sit": `wss://wsapi-eu-sit.newlife.io/creator`,
  "eu-prod": `wss://wsapi-eu-prod.newlife.io/creator`,
};

export const APP_DOMAIN = "life.nco";

export const firebaseConfig = firebaseConfigs[stage];
export const newlifeBaseUrl = newlifeBaseUrls[stage];
export const newlifeMediaBucket = newlifeMediaBuckets[stage];
export const newlifeWebsocketsServer = newlifeWebsocketsServers[stage];

export const config = {
  settings: {
    firebaseConfig,
    newlife: {
      baseUrl: newlifeBaseUrl,
      mediaBucket: newlifeMediaBucket,
      websocketsServer: newlifeWebsocketsServer,
    },
  },
  components: {
    layout: {
      // Layout: Layout as GenericComponent,
      // TopMenu: TopMenu as GenericComponent,
    },
    auth: {
      // AuthWidget: AuthWidget as GenericComponent,
    },
    icons: {
      // Logo: Logo as GenericComponent,
    },
  },
};

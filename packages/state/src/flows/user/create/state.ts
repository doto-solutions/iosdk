import {
  UserCreateRequest,
  ErrorResponse,
} from "@newlife/newlife-creator-client-api";
import { Wizard } from "./wizardStateMachine";

export enum DOMAIN_PRESALE_STEPS {
  SELECT_DOMAIN,
  AUTHENTICATE,
  CREATE_USER,
  DONE,
}

export const state = {
  form: {} as Partial<UserCreateRequest & { displayName?: string }>,
  justCreated: false as boolean,
  legacyToken: "" as string,
  formUsernameIsAvailable: "" as "available" | "checking" | "unavailable" | "",
  wizard: Wizard.create(
    { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false },
    { current: "SELECT_DOMAIN", hasNext: false, hasPrev: false }
  ),
  // {
  //     step: {
  //         current: DOMAIN_PRESALE_STEPS.SELECT_DOMAIN as DOMAIN_PRESALE_STEPS,
  //         next: derived((_state, rootState) => wizardStepNext({ state: rootState })),
  //         prev: derived((_state, rootState) => wizardStepPrev({ state: rootState })),
  //     }
  // }
};

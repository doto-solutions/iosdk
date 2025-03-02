import { Stripe, StripeElements } from "@stripe/stripe-js";
import { Action } from "../../types";

const pay: Action<{ stripe?: Stripe | null, elements?: StripeElements | null }> = 
async ({ state, actions, effects }, { stripe, elements }) => {
    if (!elements || !stripe) {
        return;
    }

    const el = elements.getElement("payment");
    if (!el) {
        return effects.ux.message.error("Stripe did not init correctly");
    }

    // return
    const loc = window.location;
    const confirmation = await stripe.confirmPayment({
        elements,
        confirmParams: {
            return_url: `${loc.protocol}//${loc.hostname}${state.routing.location}`,
        },
        redirect: "if_required"
    });

    effects.ux.notification.open({
        message: "Success! You have subscribed. Please fill in a few more details.",
    });
    await actions.api.auth.authorize();

    if (confirmation.paymentIntent?.status === "succeeded")
        await actions.auth.fakeUserUpdate({
            subscriptionStatus: "subscribed",
        });
    else
        effects.ux.notification.error({
            message:
                "Someting has gone wrong while paying. Please try again. " +
                (confirmation.error?.message || ""),
        });
};

export default {
    actions: {
        pay
    }
};
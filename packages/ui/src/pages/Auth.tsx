import { Button, Input } from "antd";
import Form from "antd/lib/form";

// import '../App.css';

import { useEffect, useState } from "react";
import { ProgressButton } from "../Components/ProgressButton";
import { CrossCircleErr } from "./User/UserCreate";
import { IndeterminateProgressAction } from "../Components/IndeterminateProgress";
import { EmbeddableControl } from "@newcoin-foundation/core";
import { useAppState, useActions } from "@newcoin-foundation/state";
import { AUTH_FLOW_STATUS } from "@newcoin-foundation/state/dist/src/auth/state";

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export const Auth = ({
  embedded,
  setNext,
  setIsErrorSubmit,
}: React.PropsWithChildren<EmbeddableControl>) => {
  const state = useAppState();
  const actions = useActions();

  const [phoneForm] = Form.useForm();
  const [codeForm] = Form.useForm();
  const [authFormErr, setAuthFormErr] = useState<boolean>(false);

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Auth" }]);
  }, []);

  useEffect(() => {
    if (state.api.auth.authorized && state.routing.location === "/auth")
      actions.routing.historyPush({ location: "/explore" });
  }, [state.api.auth.authorized, state.routing.location]);

  const _setNext = () => {
    embedded &&
      setNext &&
      setNext(
        state.auth.status === AUTH_FLOW_STATUS.ANONYMOUS
          ? {
              text: "Send verification",
              command: () => phoneForm.submit(),
            }
          : state.auth.status === AUTH_FLOW_STATUS.RECEIVED
          ? { text: "Verify", command: () => codeForm.submit() }
          : undefined
      );

    return () => setNext && setNext(undefined);
  };

  useEffect(_setNext, [state.auth.status]);
  useEffect(_setNext, []);

  // if (state.auth.authenticated && state.api.auth.user.id)
  // 	if (state.auth.authenticated)
  // 		return (
  // 			<p>
  // 				You are logged in. Go <Link to="/explore">explore</Link>!
  // 			</p>
  // 		);

  return (
    <div className="app-main-centered">
      <div id="sign-in-button" />

      <Form
        form={phoneForm}
        hidden={state.auth.status != AUTH_FLOW_STATUS.ANONYMOUS}
        {...layout}
        name="basic"
        initialValues={{ phone: "+420111111111" }} // +420111111111
        onFinish={({ phone }) => {
          actions.firebase.requestToken({ phone });
          // phoneForm.resetFields();
        }}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          // label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "The phone number is invalid.",
              pattern: new RegExp(
                "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,7}$"
              ),
            },
          ]}
          style={{ height: "50px" }}
        >
          <Input
            className="text-center"
            placeholder="enter phone number"
            suffix={<CrossCircleErr />}
            onChange={() =>
              phoneForm
                .validateFields()
                .then(() => {
                  setIsErrorSubmit!(false);
                })
                .catch((e) => {
                  console.log(e.errorFields?.length);
                  if (e.errorFields?.length) {
                    setIsErrorSubmit!(true);
                  } else;
                })
            }
          />
        </Form.Item>
        {/* <Form.Item
					// label="Phone"
					name="email"
					rules={[{ required: true, message: "Phone number please" }]}
				>
					<Input className="text-center" placeholder="phone" />
				</Form.Item> */}
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: layout.labelCol.span,
          }}
          hidden={embedded}
        >
          {
            <Button hidden={embedded} type="primary" htmlType="submit">
              Send verification
            </Button>
          }
        </Form.Item>
      </Form>
      <Form
        form={codeForm}
        {...layout}
        hidden={state.auth.status !== AUTH_FLOW_STATUS.RECEIVED}
        name="basic"
        initialValues={{ phoneVerificationCode: "" }} // 111111
        onFinish={({ phoneVerificationCode }) =>
          actions.firebase.verifyPhone({
            phoneVerificationCode,
          })
        }
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Phone verification"
          name="phoneVerificationCode"
          rules={[
            {
              required: true,
              message: "Enter your verification code",
            },
          ]}
        >
          <Input
            className="text-center"
            placeholder="enter verification code"
            suffix={<CrossCircleErr />}
            onChange={() =>
              codeForm
                .validateFields()
                .then(() => {
                  setIsErrorSubmit!(false);
                })
                .catch((e) => {
                  console.log(e.errorFields?.length);
                  if (e.errorFields?.length) {
                    setIsErrorSubmit!(true);
                  }
                })
            }
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: layout.labelCol.span,
          }}
          hidden={embedded}
        >
          {!embedded && (
            <ProgressButton
              actionName="auth.firebaseVerifyPhone"
              type="primary"
              htmlType="submit"
            >
              Submit
            </ProgressButton>
          )}
        </Form.Item>
      </Form>
      {
        <div style={{ maxWidth: 640, margin: "auto" }}>
          <IndeterminateProgressAction actionName="auth.firebaseVerifyPhone" />
        </div>
      }
    </div>
  );
};

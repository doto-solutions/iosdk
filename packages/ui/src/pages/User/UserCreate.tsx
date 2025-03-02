import { UserCreateRequest } from "@newlife/newlife-creator-client-api";
import { Input } from "antd";
import Form from "antd/lib/form";
import { useEffect } from "react";
// import { logout } from "./Auth";
import { FieldData } from "rc-field-form/lib/interface";
import { useForm } from "antd/lib/form/Form";
import { RowCheckbox } from "../../Components/RowCheckbox";
import { ContentLayout } from "../../Components/ContentLayout";
import { ProgressButton } from "../../Components/ProgressButton";
import { CrossCircle } from "../../Components/Icons/CrossCircle";
import { NLView, EmbeddableControl } from "@newcoin-foundation/core";
import { useAppState, useActions, useEffects } from "@newcoin-foundation/state";
// ({ embedded, setNext } : React.PropsWithChildren<EmbeddableControl>) => {

export const CrossCircleErr: NLView<{ children?: JSX.Element }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <div className="error-circle-form ">
        <CrossCircle />
      </div>
    </>
  );
};

export const UserCreate: NLView<
  EmbeddableControl & {
    hideUsername?: boolean;
    noRouing?: boolean;
    setIsErrorSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ hideUsername, noRouing, embedded, setNext, setIsErrorSubmit }) => {
  const state = useAppState();
  const actions = useActions();
  const effects = useEffects();

  const [form] = useForm();

  const username = state.flows.user.create.form.username;

  useEffect(() => {
    actions.routing.setBreadcrumbs([{ text: "Create your profile" }]);
  }, []);

  const setNextEmbedded = () => {
    (!state.api.auth.user?.username || state.flows.user.create.legacyToken) && //["invited", "imported", "known"].includes(state.api.auth.user.status || "") &&
      setNext &&
      setNext({
        text: "Next",
        command: () => form.submit(),
      });

    return () => setNext && setNext(undefined);
  };

  const sf = state.flows.user.create.form;

  useEffect(setNextEmbedded, [sf]);

  const onFinish = async (values: UserCreateRequest) => {
    console.log("Creating:", values);

    try {
      await form.validateFields();
      setIsErrorSubmit(false);
    } catch (e: any) {
      console.log(e.errorFields.length);
      setIsErrorSubmit(true);
      return;
    }

    actions.flows.user.create.create({
      noRouting: !!noRouing,
      user: values,
    });
  };

  // const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //     effects.ux.message.error(JSON.stringify(errorInfo))
  // };

  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <ContentLayout>
      <p
        className="super-size font-variant-none"
        style={{ marginBottom: "40px" }}
      >
        {username}
      </p>
      <Form
        name="sign-up-form"
        form={form}
        // labelCol={{ span: 6 }}
        wrapperCol={{ span: 24 }}
        // value={{ state }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFieldsChange={(_ch, all) => {
          const upd = _ch.reduce(
            (r, c: FieldData) =>
              // @ts-ignore
              ({ ...r, [c.name[0]]: c.value || c.values }),
            sf as Partial<UserCreateRequest>
          );

          actions.flows.user.create.updateForm(upd as UserCreateRequest);
        }}
        initialValues={sf}
      >
        <Form.Item
          name="username"
          hidden={hideUsername}
          rules={[
            {
              required: !hideUsername,
              validator: (_, v) =>
                /^[A-Za-z0-9\.]{4,12}$/.test(v)
                  ? Promise.resolve()
                  : Promise.reject(),
              // validator: (_, v) => (/^[\w](?!.*?\.{2})[\w.]{1,9}[\w]$/.test(v)) ? Promise.resolve() : Promise.reject(),
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="username" suffix={<CrossCircleErr />} />
        </Form.Item>
        <Form.Item
          name="displayName"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input placeholder="name" suffix={<CrossCircleErr />} />
        </Form.Item>
        {/* <Form.Item
					name="firstName"
					rules={[
						{
							required: true,
							message: "Please enter your first name.",
						},
					]}
				>
					<Input placeholder="name" suffix={<CrossCircleErr />} />
				</Form.Item> */}
        <Form.Item
          name="email"
          rules={[
            {
              pattern: new RegExp(re),
              message: "Please input valid email.",
            },
          ]}
        >
          <Input placeholder="email" suffix={<CrossCircleErr />} />
        </Form.Item>

        {/* <Form.Item
					name="lastName"
					rules={[
						{
							required: true,
							message: "Please input your last name!",
						},
					]}
				>
					<Input
						placeholder="last name"
						suffix={<CrossCircleErr />}
					/>
				</Form.Item> */}
        <Form.Item name="description">
          <Input.TextArea placeholder="bio" />
        </Form.Item>
        <Form.Item name="website">
          <Input placeholder="website" />
        </Form.Item>

        <Form.Item name="instagram">
          <Input placeholder="instagram" />
        </Form.Item>
        <Form.Item name="tumblr">
          <Input placeholder="tumblr" />
        </Form.Item>
        <Form.Item name="soundcloud">
          <Input placeholder="soundcloud" />
        </Form.Item>
        <Form.Item name="twitter">
          <Input placeholder="twitter" />
        </Form.Item>

        <Form.Item
          name="consentPrivacyPolicy"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
        >
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I agree to Newlife's privacy policy
            </p>
          </RowCheckbox>
        </Form.Item>
        <Form.Item
          name="consentEmail"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I consent to email communications
            </p>
          </RowCheckbox>
        </Form.Item>
        <Form.Item
          name="consentTestgroup"
          valuePropName="checked"
          wrapperCol={{ offset: 0, span: 24 }}
        >
          <RowCheckbox>
            <p className="paragraph-2r" style={{ margin: 0 }}>
              I'd like to join the beta group!
            </p>
          </RowCheckbox>
        </Form.Item>
        {/* <Form.Item
					hidden={!embedded}
					wrapperCol={{ offset: 0, span: 24 }}
				>
					<IndeterminateProgressAction actionName="api.user.create" />
				</Form.Item> */}
        <Form.Item hidden={embedded} wrapperCol={{ offset: 8, span: 16 }}>
          <ProgressButton
            actionName="api.user.create"
            type="primary"
            htmlType="submit"
          >
            Submit
          </ProgressButton>
        </Form.Item>
      </Form>
    </ContentLayout>
  );
};

// function logout() {
//     throw new Error("Function not implemented.");
// }

import {
	UserReadPrivateResponse,
	UserReadPublicResponse,
} from "@newlife/newlife-creator-client-api";
import { List, Avatar, Col, Row, Button, Modal, Input, Slider } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { Link } from "react-router-dom";
import {
	useCachedPool,
	useCachedPowerups,
	useCachedUser,
} from "../hooks/useCached";
import { useActions, useAppState } from "../overmind";
import { Callback, NLView } from "../types";
import { DataRow } from "./DataRow";
import { ContentImage } from "./Image";
import { BlockExplorerLink } from "./Links";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PowerupsCacheItem } from "../overmind/api/state";
import { ItemGrid } from "./ItemGrid";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import usePreventBodyScroll from "../hooks/usePreventBodyScroll";
import { CrossCircle } from "./Icons/CrossCircle";
import { ProgressButton } from "./ProgressButton";
import { IndeterminateProgress } from "./IndeterminateProgress";
import { RevealInfo } from "./RevealInfo";
import TextArea from "antd/lib/input/TextArea";
import { HashDisplay } from "./CryptoEntities";

const ellipsisStyle = {
	maxWidth: 125,
	whiteSpace: "nowrap",
	textOverflow: "ellipsis",
	overflow: "hidden",
} as const;

export const UserWidgetVertical: NLView<{ user?: UserReadPublicResponse }> = ({
	user,
}) => {
	const u = useCachedUser({ id: user?.id || "" });
	if (!u) return <></>;
	return (
		<div style={{ marginBottom: 24 }}>
			<Link to={`/user/${u.username}`}>
				<ContentImage size="small" width="100%" src={u.contentUrl} />
			</Link>
			<Link to={`/user/stake/${u.username}`} hidden={!u.username}>
				Stake on {u.username}
			</Link>
		</div>
	);
};

export const STAKE_STEPS = {
	DISABLED: -1,
	NODAO: 0,
	SELECT: 1,
	CONFIRM: 2,
	DONE: 3,
};
const round = (v: number) => Math.round(v * 1000) / 1000;

export const UserStake: NLView<{
	user?: UserReadPrivateResponse;
	mode?: number;
	value?: number;
	minValue?: number;
	hideButton?: boolean;
	hideSelect?: boolean;
	buttonText?: string;
	closeOnDone?: boolean;

	onDone?: Callback;
	onCancel?: Callback;
}> = ({
	user,
	mode,
	value,
	minValue,
	hideButton,
	buttonText,
	hideSelect,
	closeOnDone,
	onDone,
	onCancel,
}) => {
		// const [visible, setVisible] = useState(false);
		const actions = useActions();
		const poolInfo = useCachedPool({ owner: user?.username });

		const [preStakeValue, setPrestakeValue] = useState(0);

		const [_value, setValue] = useState(value || 100);
		const [fee, setFee] = useState(0.08 * _value);
		const state = useAppState();

		const [tx, setTx] = useState("");

		const [_mode, setMode] = useState(mode ?? STAKE_STEPS.DISABLED);

		const _user = useCachedUser(user, true);

		const balances = state.newcoin.account?.acc_balances || [];
		const ncoBalance = Number((balances[0] || "").replace(/ NCO$/, ""));

		const membershipValue = state.newcoin.pools[poolInfo.code];

		minValue = minValue || 100;

		const stakeDelta = (membershipValue || 0) - (preStakeValue || 0);

		const hasDao = !!poolInfo.code; // && /\.(io|nco)$/.test(user?.username || "");

		useEffect(() => {
			setMode(mode ?? STAKE_STEPS.DISABLED);
		}, [mode]);

		useEffect(() => {
			!hasDao && _mode >= 0 && setMode(STAKE_STEPS.NODAO);
		}, [hasDao, _mode]);

		const updateValue = (v: number) => {
			setValue(v);
			setFee(round(0.08 * v));
		};

		const stake = async () => {
			setPrestakeValue(membershipValue);
			const res = await actions.api.user.stake({
				user: _user,
				amount: _value + ".0000",
			});
			const historyItem = [...state.api.cache.stakeHistory]
				.reverse()
				.find((h) => h.user.username === user?.username);

			const success = historyItem && !historyItem.error;

			// return
			success && setTx(historyItem?.response?.data?.TxID_stakeToPool);

			setMode(
				success && closeOnDone ? STAKE_STEPS.DISABLED : STAKE_STEPS.DONE
			);
		};
		const openUrl = (url: string) => {
			const target =
				url === "blocks"
					? `https://local.bloks.io/transaction/${tx}?` +
					"nodeUrl=http%3A%2F%2Ftestnet.newcoin.org&coreSymbol=NCO&systemDomain=eosio&" +
					"hyperionUrl=http%3A%2F%2Fhyperion.newcoin.org"
					: url === "newcoin"
						? "https://explorer.newcoin.org/transaction/" + tx
						: "";

			if (target) window.open(target, "_new");
		};

		return (
			<>
				<Modal
					visible={_mode == STAKE_STEPS.NODAO}
					cancelText="Ok"
					// onCancel={() => setMode(STAKE_STEPS.SELECT)}
					onCancel={() => {
						setMode(STAKE_STEPS.DISABLED);
						onDone && onDone({});
					}}
					okButtonProps={{ style: { display: "none" } }}
					className="nl-white-box-modal"
				>
					<Row align="middle" className="text-center">
						<Col span={8} className="nl-avatar">
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
						</Col>
					</Row>
					<div className="section-divider" />
					<Row align="middle" className="text-center">
						<Col span={24} className="nl-avatar">
							<h2>{_user.username}</h2>
							<div className="section-divider" />
							had not created their DAO yet.
							<div className="section-divider" />
							Please check this profile later.
						</Col>
					</Row>
				</Modal>
				<Modal
					visible={_mode === STAKE_STEPS.DONE}
					okText="Yes"
					cancelText="No"
					onOk={() => stake()}
					// onCancel={() => setMode(STAKE_STEPS.SELECT)}
					onCancel={() => {
						onDone &&
							onDone({
								preStakeValue,
								stakeValue: _value,
								stakeDelta,
							});
						setMode(STAKE_STEPS.DISABLED);
					}}
					cancelButtonProps={{ value: "No" }}
					footer={false}
					className="nl-white-box-modal"
				>
					<Row align="middle" className="text-center">
						<Col span={8} className="nl-avatar">
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
						</Col>
						<Col span={4}></Col>
						<Col span={12} className="text-left">
							<div>
								You{" "}
								{preStakeValue
									? "increased your stake in"
									: "joined"}
								<br />
								<b style={{ fontSize: "1.3em" }}>
									{_user?.username}
								</b>
								's DAO.
							</div>
						</Col>
					</Row>
					<div className="text-center">
						<br />
						<h2 className="header-2">Congratulations!</h2>
						{preStakeValue ? (
							<>
								Your stake in {_user?.username}'s DAO increased by{" "}
								{stakeDelta} {poolInfo.code}.
							</>
						) : (
							<>
								You are now a member of the {_user?.username}'s DAO
								with all the rights and duties associated.
							</>
						)}
						<br />
						<br />
						<p className="text-left">
							{_value} $NCO
							<br />— {round((fee * 5) / 8)} $NCO (5%) creator fee
							<br />— {round((fee * 3) / 8)} $NCO (3%) DAO fee
							<br />
							<br />
							Total stake:
						</p>
						<h1>{round(_value - fee)} NCO</h1>
						<Button
							className="nl-button-primary"
							onClick={() => openUrl("newcoin")}
						>
							View on Newcoin
						</Button>
						<Button
							className="nl-button-primary"
							onClick={() => openUrl("blocks")}
						>
							View on Blocks
						</Button>
					</div>
				</Modal>
				<Modal
					visible={_mode === STAKE_STEPS.CONFIRM}
					title="Confirm your request"
					okText="Yes"
					cancelText="No"
					onOk={() => stake()}
					closeIcon={<CrossCircle />}
					onCancel={() => {
						setMode(
							hideButton ? STAKE_STEPS.DISABLED : STAKE_STEPS.SELECT
						);
						// mode === STAKE_STEPS. : DONE
						// 	? onDone && onDone()
						// 	: onCancel &&  : onCancel();
						// setMode(STAKE_STEPS.SELECT);
						// }}
					}}
					// cancelButtonProps={{ value: "No" }}
					footer={
						state.indicators.specific["api.user.stake"] ? (
							<IndeterminateProgress inProgress={true} />
						) : undefined
					}
					className="nl-white-box-modal primary-buttons-modal"
				>
					Are you sure you want to
					{membershipValue ? (
						<>
							{" "}
							increase your stake in {_user?.username || ""}'s DAO by{" "}
							{_value} $NCO
						</>
					) : (
						<>
							{" "}
							stake {_value} $NCO to join {_user?.username || ""}'s
							DAO?
						</>
					)}
					?
					<br />
					You will deposit {_value} $NCO and pay a {round(fee)} $NCO fee.
					{/* to get
					your 1000 ${(_user?.username || "").toUpperCase()}. */}
				</Modal>
				<Modal
					visible={_mode >= STAKE_STEPS.SELECT && !hideSelect}
					okText={"Close"}
					footer={false}
					onCancel={() => {
						mode === STAKE_STEPS.DONE
							? onDone && onDone()
							: onCancel && onCancel();
						setMode(STAKE_STEPS.DISABLED);
					}}
					className="nl-white-box-modal"
					closeIcon={<CrossCircle />}
				>
					<Row
						align="middle"
						className="text-center nl-row-vertical-space"
					>
						<Col span={24} className="nl-avatar">
							<Avatar
								size="large"
								src={<ContentImage size="medium" {..._user} />}
							/>
						</Col>
						<Col span={24}>
							{membershipValue > 0 ? (
								<>
									Your current stake in {_user?.username || ""}'s
									DAO is {poolInfo.code} {membershipValue}. Stake{" "}
									{_value} NCO more to increase your membership
									value.
								</>
							) : (
								<>Join {_user?.username || ""}'s DAO</>
							)}
						</Col>
						<Col span={24}>
							<div>
								<Input
									onChange={(e) =>
										setValue(Number(e.target.value))
									}
									value={_value}
									suffix="$NCO"
								/>
							</div>
						</Col>
						<Col span={24}>
							<div>
								<Slider
									className="nl-slider"
									value={_value}
									tooltipVisible={false}
									style={{ width: "100%" }}
									onChange={updateValue}
									marks={{
										[minValue]: [minValue],
										[ncoBalance]: ncoBalance,
									}}
									min={minValue}
									max={ncoBalance}
								/>
							</div>
						</Col>
						<Col span={24}>
							<div>
								<Button
									className="nl-button-primary"
									onClick={() => setMode(STAKE_STEPS.CONFIRM)}
								>
									Stake
								</Button>
							</div>
							<small>{Math.round(fee * 100) / 100} $NCO Fee</small>
						</Col>
						<Col span={24}>
							<small>
								Learn more about{" "}
								<a
									href="https://en.wikipedia.org/wiki/The_DAO_(organization)"
									target="_new"
								>
									DAOs
								</a>
							</small>
						</Col>
					</Row>
				</Modal>
				{hideButton ? (
					""
				) : (
					<ProgressButton
						actionName="api.user.stake"
						onClick={() => setMode(STAKE_STEPS.SELECT)}
						className="nl-button-primary"
					>
						{buttonText || "Stake"}
					</ProgressButton>
				)}
			</>
		);
	};

export const UserPowerup: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => {
	const [visible, setVisible] = useState(false);
	const actions = useActions();
	const state = useAppState();

	const currentUserPowerups: PowerupsCacheItem = useCachedPowerups() as any;

	const poolInfo = useCachedPool({ owner: user?.username });
	const membershipValue = state.newcoin.pools[poolInfo.code];

	const rating = currentUserPowerups?.out?.value?.find(
		(u) => u.id === user?.id
	);
	const isPowering = !!rating;
	const timeSince = rating?.rating?.created
		? Date.now() - new Date(rating?.rating?.created).getDate()
		: -1;

	const [stakeMode, setStakeMode] = useState(false);

	const powerup = async () => {
		setVisible(true);
		!isPowering && user && (await actions.api.user.powerup({ user, amount: 1 }));
	};

	const toStakeMode = () => {
		setStakeMode(true);
		setVisible(false);
	};

	// () => actions.routing.historyPush({ location: `/user/stake/${u.id}` })
	return (
		<>
			<Modal
				visible={visible}
				// title="Multiply your powerup"
				okText={"Close"}
				onOk={() => setVisible(false)}
				onCancel={() => setVisible(false)}
				cancelButtonProps={{ hidden: true }}
				footer={false}
				className="nl-white-box-modal"
				closeIcon={<CrossCircle />}
			>
				<div className="text-center">
					<div>
						<Row align="middle" className="text-center">
							<Col span={8} className="nl-avatar">
								<Avatar
									size="large"
									src={
										<ContentImage
											size="medium"
											{...user}
										/>
									}
								/>
							</Col>
							<Col span={4} className="text-left"></Col>
							<Col span={12} className="text-left">
									<div>
										{isPowering && timeSince > 60000 ?
										"You powered" :
										state.indicators.specific["api.user.powerup"] ?
										"Powering..."
										: ""}
		
										<br />
										<b style={{ fontSize: "1.3em" }}>
											{user?.username}
										</b>
									</div>
								</Col>
						</Row>
						<Row gutter={12} className="text-center">
							<Col span={24}>
								<span className="nl-font-huge">+1</span>
							</Col>
						</Row>
					</div>
		
					<Row gutter={48}>
						<Col span={24}>
							<br />
							Multiply your power up (i)
							<br />
							<br />
							<Button
								className="nl-button-primary"
								onClick={() => { }}
							>
								8X Power up
							</Button>
						</Col>
						<Col span={24} className="text-bold">
							<br />
							<Button
								className="nl-button-primary inverse"
								onClick={toStakeMode}
							>
								{membershipValue
									? "Stake more"
									: "Join the DAO"}
							</Button>
						</Col>
					</Row>
				</div>
			</Modal>
			<Button onClick={powerup} className="powerup-btn ">
				<p
					className="paragraph-2b"
					style={{ lineHeight: 0, margin: 0 }}
				>
					Power up
				</p>
			</Button>
			{
				<UserStake
					onDone={() => setStakeMode(false)}
					hideButton={true}
					user={user}
					mode={stakeMode ? STAKE_STEPS.SELECT : STAKE_STEPS.DISABLED}
				/>
			}
		</>
	);
};

export const UserWidgetTopFixed: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => {
	return (
		<div style={{ position: "fixed", left: 0, top: 54 }}>
			<Link to={`/user/${user?.username}`}>
				<div
					style={{
						wordBreak: "break-all",
						maxWidth: "100%",
						minHeight: "1.5em",
					}}
				>
					{user?.username}
				</div>
			</Link>
		</div>
	);
};

export const UserWidgetHeading: NLView<{
	user?: UserReadPrivateResponse;
	setActiveKey: React.Dispatch<React.SetStateAction<string>>;
}> = ({ user, setActiveKey }) => {
	const u = useCachedUser({ username: user?.username }, true);
	const state = useAppState();

	if (!user) return <></>;
	// return <Card title={""}
	// cover={<ContentImage width="100%" src={user.contentUrl} />}
	// >

	return (
		<Row
			wrap={true}
			// gutter={30}
			align="middle"
			style={{ textAlign: "center", minHeight: 250 }}
			className="app-main-full-width"
		>
			<Col span={8} className="nl-avatar">
				<Avatar src={<ContentImage {...u} />} />
			</Col>
			<Col span={16} className="user-widget-heading">
				<Row
					className="user-widget-heading"
					style={{ width: "100%", textAlign: "left" }}
					justify="start"
				>
					<Col xs={24} sm={12} className="username">
						<h2 className="header-2">
							<Link to={`/user/${u.username}`}>
								<div
									style={{
										wordBreak: "break-all",
										maxWidth: "100%",
										minHeight: "1.5em",
									}}
									className="header-3"
								>
									{u.username}
								</div>
							</Link>
						</h2>
						<Paragraph ellipsis={{ rows: 3 }}>
							{user.description || "no description"}
						</Paragraph>
						{u.id === state.api.auth.user?.id ? (
							<Link
								title="Public view"
								to={`/user/${u.username}`}
							>
								<EyeOutlined />
							</Link>
						) : (
							""
						)}
						{u.id === state.api.auth.user?.id ? (
							<Link to="/my/profile/update">
								<EditOutlined />
							</Link>
						) : (
							""
						)}
					</Col>
					<Col xs={24} sm={12} className="powerup">
						<h2
							onClick={() => setActiveKey("1")}
							style={{ cursor: "pointer" }}
							className="header-2"
						>
							{u.powered || ""}
						</h2>
						<UserPowerup user={u} />
						{/* <Button onClick={() => actions.routing.historyPush({ location: `/user/stake/${u.id}` })}>Power up</Button> */}
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
// export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({ user }) => <div>{JSON.stringify</div>

export const UserSocialInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
	<List
		// header="Activity Stream"
		itemLayout="horizontal"
		dataSource={"instagram,soundcloud,twitter,facebook,pinterest"
			.split(/,/)
			.filter((k) => (user as any)[k])}
		renderItem={(k) => {
			return (
				<List.Item>
					<List.Item.Meta
						description={
							<DataRow
								title={k}
								value={(user as any)[k]}
								link={`https://www.${k}.com/${(user as any)[k]
									}`}
							/>
						}
					/>
				</List.Item>
			);
		}}
	/>
);

export const UsersList: NLView<{
	users?: UserReadPrivateResponse[];
	powerUp?: boolean;
	title?: string;
	layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => (
	<>
		{title ? <h4 className="header-4">{title}</h4> : ""}
		<List
			// header="Activity Stream"
			itemLayout={layout || "horizontal"}
			dataSource={users || []}
			renderItem={(u) => {
				return (
					<List.Item>
						<List.Item.Meta
							avatar={<Avatar src={<ContentImage {...u} />} />}
							description={
								<Row
									align="middle"
									gutter={18}
									className="app-main-full-width-only"
									justify="start"
									wrap={true}
								>
									<Col sm={24} xxl={24}>
										<Link
											to={`/user/${u.username}`}
											className="paragraph-1r"
										>
											{u.username}
										</Link>
										<Paragraph
											style={{ marginBottom: "0" }}
											className="paragraph-2r"
										>
											{u.powered || ""}
										</Paragraph>
									</Col>
									{/* <Col sm={24} xxl={16}>
										{u.powered || ""}
									</Col> */}
									{/* <Col sm={24} xxl={8}>
										{powerUp ? (
											<UserPowerup user={u} />
										) : (
											""
										)}
									</Col> */}
								</Row>
							}
						/>
					</List.Item>
				);
			}}
		/>
	</>
);

// // header="Activity Stream"

// items={users || []}
// render={(u: UserReadPublicResponse) => {

const sliderStyle = {
	height: "160px",
	color: "#fff",
	lineHeight: "160px",
	background: "#364d79",
	padding: 12,
	width: "min(100%,300px)",
};

export const UsersHorizontalScroller: NLView<{
	users?: UserReadPrivateResponse[];
	powerUp?: boolean;
	title?: string;
	layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => {
	const { disableScroll, enableScroll } = usePreventBodyScroll();
	console.log(users);

	return (
		<div
			style={{
				width: "100%",
				height: 200,
				marginBottom: 100,
				marginTop: "1em",
			}}
			onMouseEnter={disableScroll}
			onMouseLeave={enableScroll}
		>
			{title ? (
				<h2 className="app-main-full-width header-2">{title}</h2>
			) : (
				""
			)}
			<ScrollMenu
			// LeftArrow={<LeftOutlined />} RightArrow={<RightOutlined />}
			>
				{/* <Row align="middle" gutter={6} style={{ padding: 12 }} justify="center" wrap={true}> */}
				{users?.map((u, i) => {
					return (
						<Row
							align="middle"
							style={{
								width: /*180*/ "auto",
								height: 150,
								marginLeft: "20px",
								marginRight: "20px",
								flexWrap: "inherit",
							}}
							justify="center"
							wrap={true}
						>
							<Col
								/*sm={16} xxl={6}*/
								className="u-margin-small"
							>
								<Avatar
									src={<ContentImage size="medium" {...u} />}
								/>
							</Col>
							<Col /*sm={16} xxl={8}*/>
								<Link
									to={`/user/${u.username}`}
									className="paragraph-1b"
								>
									{u.username}
								</Link>
								<br></br>
								{u.powered || ""}
							</Col>
						</Row>
					);
				}) || <></>}
				{/* </Row> */}
			</ScrollMenu>
		</div>
	);
};

export const UsersGrid: NLView<{
	users?: UserReadPrivateResponse[];
	powerUp?: boolean;
	title?: string;
	layout?: "horizontal" | "vertical";
}> = ({ users, powerUp, title, layout }) => (
	<>
		{title ? <h2 className="app-main-full-width">{title}</h2> : ""}
		<ItemGrid
			// header="Activity Stream"

			items={users || []}
			render={(u: UserReadPublicResponse) => {
				return (
					<Row
						align="middle"
						gutter={6}
						style={{ padding: 12 }}
						justify="center"
						wrap={true}
					>
						<Col sm={10} xxl={4}>
							<Avatar
								src={<ContentImage size="small" {...u} />}
							/>
						</Col>
						<Col sm={14} xxl={20}>
							<Link to={`/user/${u.username}`}>{u.username}</Link>
							<br></br>
							{u.powered || ""}
						</Col>
					</Row>
				);
			}}
		/>
	</>
);

export const UserSocialInfoRow: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
	<>
		{"instagram,soundcloud,twitter,facebook,pinterest,tumblr" //,phone,status"
			.split(/,/)
			.filter((k) => (user as any)[k])
			.map((k) => (
				<DataRow
					title={k}
					value={(user as any)[k]}
					link={`https://www.${k}.com/${(user as any)[k]}`}
				/>
			))}
	</>
);

export const PoolInfoDataRow: NLView<{ pool?: { code: string } }> = ({
	pool,
}) => {
	const poolInfo = useCachedPool(pool);
	const myPools = useAppState().newcoin.pools;
	return (
		<DataRow
			title={
				<Link to={`/user/${poolInfo?.owner}`}>{poolInfo?.owner}</Link>
			}
			value={`${pool?.code} ${myPools[poolInfo?.code]} ${poolInfo?.code
				} / ${poolInfo?.total.quantity}`}
			link={`/user/${poolInfo?.owner}`}
			target=""
		/>
	);
	// <>${poolInfo?.owner} {JSON.stringify(poolInfo)}</>;
};

export const UserNewcoinPoolsParticipation: NLView<{
	user?: UserReadPrivateResponse;
}> = ({ user = {} }) => {
	const nc = useAppState().newcoin;

	return (
		<>
			{Object.keys(nc.pools).map(
				(code) => (
					<PoolInfoDataRow pool={{ code }} />
				)
				// <DataRow
				//     title={<PoolInfo pool={{code}} />}
				//     value={`${val as string} ${code}`}
				// />
			)}
		</>
	);
};

export const UserNewcoinInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user = {},
}) => {
	const state = useAppState();
	return (
		<>
			<DataRow
				title="newcoin domain name"
				value={user.username}
				link={`https://explorer.newcoin.org/account/${user.username}`}
			/>
			<DataRow
				title="account balance"
				value={state.newcoin.account.acc_balances}
			/>

			<DataRow
				title="newcoin pool"
				value={<BlockExplorerLink id={user.newcoinPoolId} />}
			// link={`https://explorer.newcoin.org/account/${user.newcoinPoolId}`}
			/>
			<DataRow
				title="newcoin account"
				value={<BlockExplorerLink id={user.newcoinAccTx} />}
			// link={`https://explorer.newcoin.org/account/${user.newcoinAccTx}`}
			/>
			<DataRow
				title="newcoin publisher public key"
				value={<HashDisplay hash={user.newcoinPublisherPublicKey} />}
			// link={`https://explorer.newcoin.org/account/${user.newcoinPoolId}`}
			/>
			<DataRow
				title="newcoin publisher private key"
				value={
					<RevealInfo>
						<HashDisplay hash={user.newcoinPublisherPrivateKey} />
					</RevealInfo>
				}
			// link={`https://explorer.newcoin.org/account/${user.newcoinPoolId}`}
			/>
		</>
	);
};

export const UserPrivateInfo: NLView<{ user?: UserReadPrivateResponse }> = ({
	user,
}) => (
	<>
		{user &&
			"instagram,soundcloud,twitter,facebook,pinterest,phone,status"
				.split(/,/)
				.filter((k) => (user as any)[k])
				.map((k) => {
					return (
						<Row style={{ width: "100%" }}>
							<Col span={12}>
								{user.firstName} {user.lastName} {user.fullName}
							</Col>
						</Row>
					);
				})}
	</>
);

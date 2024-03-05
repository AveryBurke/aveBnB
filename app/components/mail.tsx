import { Body, Container, Head, Html, Hr, Img, Link, Preview, Text } from "@react-email/components";
import * as React from "react";

interface EmailProps {
	username?: string;
	timeRange?: string;
	property?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : "";

export const EmailTemplatel: React.FC<Readonly<EmailProps>> = ({ username, timeRange, property }) => (
	<Html>
		<Head />
		<Preview>Your reservation has been removed by the property owner</Preview>
		<Body style={main}>
			<Container style={container}>
				<Img src={`${baseUrl}/public/images/logo.png`} width="32" height="32" alt="AveBnB" />

				<Text style={title}>
					&#127881; Congradulations <strong>{username}</strong> &#127881;
				</Text>

				<Text style={text}>
					Your reservation at <strong>{property}</strong> for <strong>{timeRange}</strong> has been removed by the property owner.
				</Text>
				<Hr />
				<Text style={links}>
					<Link href="https://docs.google.com/document/d/1gPPUfcy52hx8I-VSff_W4C9HQ2uiLeWq7Tev6wAxfkw/edit?usp=sharing" style={link}>
						Our privacy policy
					</Link>{" "}
					・{" "}
					<Link style={link} onClick={() => (window.location.href = "mailto:DrFroid01@gmail.com")}>
						Contact support
					</Link>
				</Text>
				<Text style={footer}>AveBnB ・ Do Not Try To Find Us ・ we are nowhere</Text>
			</Container>
		</Body>
	</Html>
);

export default EmailTemplatel;

const main = {
	backgroundColor: "#ffffff",
	color: "#24292e",
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
	maxWidth: "480px",
	margin: "0 auto",
	padding: "20px 0 48px",
};

const title = {
	fontSize: "24px",
	lineHeight: 1.25,
};

const text = {
	margin: "0 0 10px 0",
	textAlign: "left" as const,
};

const links = {
	textAlign: "center" as const,
};

const link = {
	color: "#0366d6",
	fontSize: "12px",
};

const footer = {
	color: "#6a737d",
	fontSize: "12px",
	textAlign: "center" as const,
	marginTop: "60px",
};

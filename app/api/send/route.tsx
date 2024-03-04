import EmailTemplate from "@/app/components/mail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { username, timeRange, property, sender } = body;
	try {
		const { data, error } = await resend.emails.send({
			from: "AveBnB <DrFroid01@gmail.com>",
			to: [sender],
			subject: `Your reservation at ${property} has been removed by the property owner`,
			react: EmailTemplate({ username, timeRange, property }) as React.ReactElement,
		});

		if (error) {
			return NextResponse.json({ error });
		}
		return NextResponse.json({ data });
	} catch (error) {
		return NextResponse.json({ error });
	}
}

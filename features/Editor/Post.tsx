"use client";
import dynamic from "next/dynamic";
import React from "react";
const Edit = dynamic(
	() =>
		import(
			"./Edit" //Editorコンポーネントのパス
		),
	{
		ssr: false,
	}
);

export default function Post() {
	return (
		<div>
			<Edit />
		</div>
	);
}

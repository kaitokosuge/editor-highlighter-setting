import React, { useEffect, useRef, useState } from "react";
import CodeTool from "@editorjs/code";
import EditorJS from "@editorjs/editorjs";

export default function Edit() {
	const [quizText, setQuizText] = useState("[]");
	const handleQuizText = (editor: EditorJS) => {
		editor.save().then((outputData: unknown) => {
			const strData = JSON.stringify(outputData);
			setQuizText(strData);
			setRawText(outputData);
		});
	};
	const [rawText, setRawText] = useState({ blocks: [] });
	console.log("quiztextです", quizText);
	console.log("onj quiztextです", JSON.parse(quizText));
	const ref = useRef<EditorJS | undefined>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setIsMounted(true);
		}
		if (isMounted) {
			const quEditor: EditorJS = new EditorJS({
				holder: "question",
				onReady() {
					ref.current = quEditor;
				},
				placeholder: "クイズ本文",
				inlineToolbar: true,
				tools: {
					code: CodeTool,
				},
				onChange: () => handleQuizText(quEditor),
				data: JSON.parse(quizText),
			});
			const exEditor: EditorJS = new EditorJS({
				holder: "explanation",
				onReady() {
					ref.current = exEditor;
				},
				placeholder: "クイズ本文",
				inlineToolbar: true,
				tools: {
					code: CodeTool,
				},
				onChange: () => handleQuizText(exEditor),
				data: JSON.parse(quizText),
			});
		}
		return () => {
			ref.current?.destroy();
			ref.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);
	return (
		<div className="text-white">
			<div id="question" className="min-h-[700px] bg-black"></div>
			<div id="explanation" className="min-h-[700px] bg-black"></div>
			<div>
				{/* {JSON.stringify(quizText).map((item) => (
					<div>{item}</div>
				))} */}
				{rawText.blocks.map((item, index: number) => (
					<div key={index}>
						{item.type === "code" ? (
							<>
								<pre className="text-blue-600 bg-black">{item.data.code}</pre>
							</>
						) : (
							<>
								<div>{item.data.text}</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

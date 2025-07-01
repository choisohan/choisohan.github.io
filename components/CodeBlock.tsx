"use client";

import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";





type Props = {
  className?: string;
  children?: React.ReactNode;
};

function getTextFromChildren(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
  return "";
}

export default function CodeBlock({ className, children }: Props) {
  const isBlock = !!className;
const language =className?.replace(/(language|lang)-/, "")?.toLowerCase() || "text";
  const code = getTextFromChildren(children).trim();

  if (!isBlock) {
    return (
      <code className="bg-gray-200 text-sm px-1 rounded">
        {code}
      </code>
    );
  }

  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
      {code}
    </SyntaxHighlighter>
  );
}
"use client";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";

const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 1,
      },
      id: "1234",
      type: "header",
    },
    {
      data: {
        level: 1,
      },
      id: "12345",
      type: "header",
    },
  ],
  version: "2.8.1",
};

const Editor = () => {
  const ref = useRef<EditorJS | null>(null);
  const [document, setDocument] = useState(rawDocument);

  useEffect(() => {
    inItEditor();
  }, []);

  const inItEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const EditorjsList = (await import("@editorjs/list")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Warning = (await import("@editorjs/warning")).default;

    const editor = new EditorJS({
      tools: {
        header: {
          class: Header as unknown as EditorJS.ToolConstructable,
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5, 6],
          },
          shortcut: "CTRL+SHIFT+H",
        },
        List: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            style: ["unordered", "ordered", "checklist"],
          },
        },
        paragraph: {
          class: Paragraph as unknown as EditorJS.ToolConstructable,
          inlineToolbar: true,
        },
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "Title",
            messagePlaceholder: "Message",
          },
        },
      },
      holder: "editorjs",
      data: document
    });

    ref.current = editor;
  };
  return (
    <div>
      <div id="editorjs" className="ml-20"></div>
    </div>
  );
};
export default Editor;

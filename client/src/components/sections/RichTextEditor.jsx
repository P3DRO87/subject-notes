import useBlockEditor from "@/hooks/useBlockEditor";
import { EditorContent, useEditor, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useReducer } from "react";
import { useRef } from "react";

const RichTextEditor = ({ text = "", setText = function () {} }) => {
   const editorRef = useRef();

   const editor = useBlockEditor({});

   return <EditorContent ref={editorRef} editor={editor} />;
};

export default RichTextEditor;

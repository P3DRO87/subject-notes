import ExtensionKit from "@/helpers/rich-editor-extensions";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const useBlockEditor = () => {
   const editor = useEditor({
      autofocus: true,
      extensions: [...ExtensionKit()],
      editorProps: {
         attributes: {
            autocomplete: "off",
            autocorrect: "off",
            autocapitalize: "off",
            class: "rich-editor-text",
         },
      },
   });

   return editor;
};

export default useBlockEditor;

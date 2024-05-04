import { Document } from "@tiptap/extension-document";

const document = Document.extend({ content: "(block|columns)+" });

export default document;

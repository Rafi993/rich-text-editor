import React, { useState, useRef, useCallback } from "react";

const Editor = () => {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const editorRef = useRef(null);

  const handleChange = useCallback(
    e => {
      console.log(e.keyCode);
      switch (e.keyCode) {
        // Backspace
        case 8:
          if (text.length > 0) {
            // Removing text at current cursor position
            setText(
              text.substring(0, cursor - 1) +
                text.substring(cursor, text.length)
            );
            setCursor(cursor - 1);
          }
          break;
        case 46:
          if (text.length > 0) {
            // Removing after current cursor position
            setText(
              text.substring(0, cursor) +
                text.substring(cursor + 1, text.length)
            );
            setCursor(cursor);
          }
          break;
        case 37:
          // Left arrow
          setCursor(cursor - 1);
          break;
        case 35:
          // End key
          setCursor(text.length - 1);
          break;
        case 36:
          // Home key
          setCursor(0);
          break;
        case 39:
          // Right arrow
          if (text.length > cursor + 1) {
            setCursor(cursor + 1);
          }
          break;
        case 13:
          // Newline
          setText(text + "\n");
          setCursor(cursor + 1);
          break;
        default:
          let newChar = String.fromCharCode(e.keyCode);

          if (e.shiftKey) {
            setText(text + newChar);
          } else {
            setText(text + newChar.toLowerCase());
          }

          setCursor(cursor + 1);
      }
    },
    [text, setText, cursor, editorRef, setCursor]
  );

  console.log("data stored", text);
  return (
    <>
      <div
        tabIndex="0"
        role="textarea"
        className="Editor"
        onKeyDown={handleChange}
        ref={editorRef}
        contentEditable
      />
      {text}
    </>
  );
};

export default Editor;

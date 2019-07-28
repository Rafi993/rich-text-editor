import React, { useState, useRef, useCallback } from "react";

const Editor = () => {
  const [text, setText] = useState("");
  const [cursor, setCursor] = useState(0);
  const editorRef = useRef(null);

  const handleChange = useCallback(
    e => {
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
          const { keyCode } = e;
          const valid =
            (e.keyCode > 47 && e.keyCode < 58) || // number keys
            e.keyCode == 32 ||
            e.keyCode == 13 || // spacebar & return key(s) (if you want to allow carriage returns)
            (e.keyCode > 64 && e.keyCode < 91) || // letter keys
            (e.keyCode > 95 && e.keyCode < 112) || // numpad keys
            (e.keyCode > 185 && e.keyCode < 193) || // ;=,-./` (in order)
            (e.keyCode > 218 && e.keyCode < 223); // [\]' (in order)

          if (!valid) {
            return;
          }

          let newChar = String.fromCharCode(keyCode);

          if (e.shiftKey || e.getModifierState("CapsLock")) {
            setText(text + newChar);
          } else {
            setText(text + newChar.toLowerCase());
          }
          setCursor(cursor + 1);
      }
    },
    [text, setText, cursor, editorRef, setCursor]
  );

  const pasteAsPlainText = useCallback(
    e => {
      e.preventDefault()
      const text = e.clipboardData.getData("text/plain");
      const newText =text + pasteAsPlainText;
      setText(newText);
      setCursor(newText.length - 1);
      document.execCommand('insertHTML', false, newText);
    },
    [text, setText, setCursor]
  );

  console.log("data stored", text);
  return (
    <>
      <div
        tabIndex="0"
        role="textarea"
        html={text}
        className="Editor"
        onKeyDown={handleChange}
        ref={editorRef}
        onPaste={pasteAsPlainText}
        contentEditable
      />
      {text}
    </>
  );
};

export default Editor;

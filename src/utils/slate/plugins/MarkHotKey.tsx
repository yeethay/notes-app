import { Editor } from 'slate-react';

function MarkHotKey(options: { key: string; type: string }) {
  const { key, type } = options;
  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next: () => any) {
      // If it doesn't match our `key`, let other plugins handle it.
      if (!event.metaKey || event.key !== key) return next();
      // Prevent the default characters from being inserted.
      event.preventDefault();
      // Toggle the mark `type`.
      editor.toggleMark(type);
    },
  };
}

export default MarkHotKey;

import Editor from './hotAreaEditor';
import Preview from './hotAreaPreview';
export default {
  type: Editor.designType,
  editor: Editor,
  dragable: true,
  preview: Preview,
};

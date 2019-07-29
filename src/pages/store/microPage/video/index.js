import Editor from './VideoEditor';
import Preview from './VideoPreview';
export default {
  type: Editor.designType,
  editor: Editor,
  dragable:true,
  preview: Preview
};
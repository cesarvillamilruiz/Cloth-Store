interface ITreeNode {
    name: string;
    children?: TreeNode[];
  }

export class TreeNode implements ITreeNode {
  name: string;
  children?: TreeNode[];
}
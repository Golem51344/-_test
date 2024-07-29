export type Form = API.PubResource;
export type AddForm = API.PubResourceAddDto;
export type EditForm = API.PubResourceUpdateDto;
export type TreeNode = Form & {
  children?: TreeNode[]
};

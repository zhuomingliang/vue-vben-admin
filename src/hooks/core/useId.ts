// 本 'Hook' 主要是为了方便表单验证时，传送特定的参数给 validator,
// 临时解决 validator 无法获取表单上下文参数条件的问题
import { onBeforeUpdate } from 'vue';

let id: Nullable<number> = null;
export function useId(): [Nullable<number>, (value: Nullable<number>) => void] {
  onBeforeUpdate(() => {
    id = null;
  });

  const setId = (value: Nullable<number>) => {
    id = value;
  };

  return [id, setId];
}

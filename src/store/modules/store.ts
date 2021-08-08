export const createState = () => {
  const store = {
    name: '',
  }
  return store
}
// 类型推导
export type userState = ReturnType<typeof createState>
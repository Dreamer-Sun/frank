import {invokeLcu} from "./index";
import {LcuRuneInfo} from "./types/runeLcuTypes";

// 应用符文页面
export const applyRunePage = async (data: {}) => {
  try {
    // 获取符文页信息
    const currentRuneList: Array<LcuRuneInfo> = await invokeLcu('get', '/lol-perks/v1/pages')
    const current = currentRuneList.find((i: LcuRuneInfo) => i.current && i.isDeletable)
    if (current != undefined) {
      // 删除当前符文页
      await invokeLcu('delete', `/lol-perks/v1/pages/${current.id}`)
    }
    // 写入新的符文页
    await invokeLcu('post', '/lol-perks/v1/pages', [data])
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

import { defineStore } from "pinia"

export type ResourceState = {
  project: {
    path: string,
    name: string,
    desc: string
  }
}

const STORE_NAME = 'RESOURCE'

export const useResourceStore = defineStore(STORE_NAME, {
  state: (): ResourceState => {
    return {
      // 项目名称
      // 也会适用于资源路径的解析
      project: {
        name: '塔盒科技',
        path: 'tahe',
        desc: 'TABOX | 塔盒科技'
      }
    }
  },
  getters: {
    logoPath() {
      return 
    }
  },
  actions: {
    wrapSourcePath(src: string) {
      return `/imgs/${this.project.path}/${src}`
    }
  }
})

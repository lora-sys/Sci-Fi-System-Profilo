// 定义系统状态类型 ，用于区分不同的页面场景，后续使用状态管理工具进行管理，比如状态机更改状态
export type SystemMode= "HOME" | "PROJECTS" | "CONTACT"

// 先使用常量定义场景预设参数 ，后续可改为从配置文件加载
export const SCENE_PRESET={
    HOME: {
        cameraZ :7,
        coreScale:1,
    },
    PROJECTS: {
        cameraZ :4,
        coreScale:0.6,
    },
    CONTACT: {
        cameraZ :6,
        coreScale:0.5,
    },
}

export type ProjectId = "HUD_SYSTEM" | "DATA_VIS" | null

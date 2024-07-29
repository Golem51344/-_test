import type { Route } from '#/vue-router';
import type { Menu } from '#/menu';

declare global {
  declare namespace API {
    interface LoginData {
      account: string
      password: string
    }

    interface AccountInfo {
      error: string
      code: number
      data: {
        account: string
        token: string
        failure_time: string
        avatar: string
      }
    }

    interface Permission {
      error: string
      code: number
      data: {
        permissions: string[]
      }
    }

    interface Preferences {
      error: string
      code: number
      data: {
        preferences: string
      }
    }

    interface IsSuccess {
      error: string
      code: number
      data: {
        isSuccess: boolean
      }
    }

    interface PasswordEditBody {
      password: string
      newpassword: string
    }

    interface Tabbar {
      error: string
      code: number
      data: {
        tabbar: string
      }
    }
    interface Favorites {
      error: string
      code: number
      data: {
        favorites: string
      }
    }

    interface RouteList {
      error: string
      code: number
      data: Route.recordMainRaw[]
    }
    interface MenuList {
      error: string
      code: number
      data: Menu.recordMainRaw[]
    }
  }
}

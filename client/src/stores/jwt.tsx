import { create } from 'zustand'
import { persist } from "zustand/middleware"


export const useJwtStore = create(
    persist(
        (set: (partial: any, replace?: boolean | undefined) => void, get) => ({
            jwt: null,
            setJwt: (jwt: string) => set({ jwt }),
            role: null,
            setRole: (role: string) => set({ role }),
            clearAll: () => set({ role: null, isEmailActivated: null, jwt: null }),
        }),
        {
            name: 'container', // unique name
        }
    )
)
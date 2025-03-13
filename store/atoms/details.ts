import { atom } from "jotai";

export enum Role {
    user = "user",
    system = "system"
}

interface Prompt{
    role: Role,
    content: string
}

export const useridAtom = atom("");

export const usertokenAtom = atom<number>(0);

export const textvalueAtom = atom("");

export const PromptAtom = atom<Prompt[]>([
    {
        role: Role.user,
        content: ""
    }
]);
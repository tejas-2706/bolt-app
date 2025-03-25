import { atom } from "jotai";

export enum Role {
    user = "user",
    system = "system"
}

export enum ActionType {
    export = "export",
    deploy = "deploy"
}

interface Prompt{
    role: Role,
    content: string
}

interface Action{
    actionType:ActionType,
    timestamp:number
}
export const isSignInVisibleAtom = atom<boolean>(false);

export const useridAtom = atom("");

export const usertokenAtom = atom<number>(0);

export const textvalueAtom = atom("");

export const ActionAtom = atom<Action>();

export const DeployLinkAtom = atom<string>("");

export const refreshChatsAtom = atom(0);

export const PromptAtom = atom<Prompt[]>([
    {
        role: Role.user,
        content: ""
    }
]);
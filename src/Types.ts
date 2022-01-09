import {Dispatch, SetStateAction} from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>
export type SessionState =
    { state: "signedOut", signedIn: false }
    |
    { state: "signingIn", signedIn: false }
    |
    { state: "signedIn", username: string, userImage: string, signedIn: true }
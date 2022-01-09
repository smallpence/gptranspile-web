import Cookies from "universal-cookie";
import {SessionState} from "./Types";
import {catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";

const session = new Cookies()
const url = process.env["REACT_APP_URL"]

function getSession(): string | undefined {
    return session.get('gptranspile_session')
}

type UserResponse = { username: string, user_image: string }

export function getSessionStateObservable(): Observable<SessionState> {
    const session = getSession()
    if (session) {
        // query backend for this session
        return ajax({
            url: `${url}/backend/checksession`,
            withCredentials: true,
            crossDomain: true,
            responseType: "text"
        }).pipe(
            // map<AjaxResponse<unknown>, SessionState>((r) => {
            //     return {state: "signedOut", signedIn: false}
            // }),
            switchMap(data => {
                switch (data.response) {
                    case "valid session":
                        return ajax({
                            url: `${url}/backend/getuserdetails`,
                            withCredentials: true,
                            crossDomain: true,
                        })
                }
                throw Error("invalid session")
            }),
            map<AjaxResponse<unknown>, SessionState>(data => {
                const userData = data.response as UserResponse
                return {state: "signedIn", signedIn: true, username: userData.username, userImage: userData.user_image}
            }),
            catchError<any, Observable<SessionState>>(_ => of(({state: "signedOut", signedIn: false}))),
            startWith<SessionState>({state: "signingIn", signedIn: false})
        )
    }
    else return of({state: "signedOut", signedIn: false})

    // const res = await fetch(`${url}/backend/checksession`, {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //         'session'
    //     }
    // });
}
import Cookies from "universal-cookie";
import {SessionState} from "./Types";
import {BehaviorSubject, catchError, map, Observable, of, startWith, switchMap} from "rxjs";
import {ajax, AjaxResponse} from "rxjs/ajax";

const cookies = new Cookies();
const url = process.env["REACT_APP_URL"];
const session = new BehaviorSubject<SessionState>({state: "signedOut", signedIn: false});

getSessionStateObservable().subscribe((value => session.next(value)));

function getSession(): string | undefined {
    return cookies.get('gptranspile_session');
}

export function endSession() {
    cookies.remove('gptranspile_session');
    session.next({state: "signedOut", signedIn: false});
}

type UserResponse = { username: string, user_image: string }

export function getSessionStateSubject(): BehaviorSubject<SessionState> {
    return session
}

function getSessionStateObservable(): Observable<SessionState> {
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

const CLIENT_ID = process.env["REACT_APP_GITHUB_OAUTH_CLIENT_ID"]
const URL = process.env["REACT_APP_URL"]

export const GITHUB_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${URL}/backend/auth`
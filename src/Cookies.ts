import Cookies from "universal-cookie";

const cookies = new Cookies()

function getSession(): string | undefined {
    return cookies.get('gptranspile_session')
}

export function hasSession(): boolean {
    console.log(getSession())
    return getSession() != undefined
}
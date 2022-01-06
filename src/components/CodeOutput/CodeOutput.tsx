import React, {useEffect, useState} from 'react';
import styles from './CodeOutput.module.css';

interface GPT3Response {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: [ {
        text: string,
        index: number,
        finish_reason: string
    } ]
}

function CodeOutput(props: {code: string, signedIn: boolean}) {
    const [output, setOutput] = useState("");
    const url = process.env["REACT_APP_URL"]

    useEffect(() => {
        const queryGPT = async () => {
            if (!props.signedIn) return "not signed in";

            const res = await fetch(`${url}/backend/gpt3`, {
                method: "GET",
                credentials: "include",
                headers: {
                    'code': props.code,
                    'language': "java"
                }
            });
            if (!res.ok) return "error"
            return await res.text();
        }

        (async () => {
            const data = await queryGPT()
            setOutput(data)
        })();
    }, [props.code, props.signedIn, url])

    return <div className={styles.CodeOutput} data-testid="CodeOutput">
        {output}
    </div>
}


export default CodeOutput;

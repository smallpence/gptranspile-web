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

    const queryGPT = async () => {
        if (!props.signedIn) {
            setOutput("not signed in");
            return;
        }

        const res = await fetch(`${url}/backend/gpt3`, {
            method: "GET",
            credentials: "include",
            headers: {
                'code': props.code,
                'language': "java"
            }
        });
        const body = await res.text();

        setOutput(body);
    }

    useEffect(() => {
        queryGPT()
    }, [props.code])

    return <div className={styles.CodeOutput} data-testid="CodeOutput">
        {output}
    </div>
}


export default CodeOutput;

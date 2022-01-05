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

    const queryGPT = async () => {
        // var res = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
        //     method: "POST",
        //     headers: {
        //         'Authorization': `Bearer ${process.env["REACT_APP_GPT_SECRET"]}`,
        //         'Content-Type': "application/json"
        //     },
        //     body: JSON.stringify({prompt: props.code, max_tokens: 40})
        // })
        // const body: GPT3Response = await res.json();
        //
        // setOutput(body.choices[0].text)

        if (!props.signedIn) {
            setOutput("not signed in");
            return;
        }

        const res = await fetch("http://127.0.0.1:8000/auth/foo", {
            method: "GET",
            credentials: "include"
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

"use client";

import styled from "styled-components";
import { useState } from "react";
import createShortenedUrl from "@/lib/generate-url";
import Link from "next/link";


const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f0f0f0;
    height: 100vh;
`;
const StyledInnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightblue;
    padding: 150px;
    border-radius: 10px;
`;
const StyledH1 = styled.h1`
    text-transform: uppercase;
    font-weight: bold;
    font-size: 48px;
    background-color: lightgray;
    padding: 20px;
    border-radius: 5px;
`;
const StyledInput = styled.input`
    &::placeholder {
        font-style: italic;
        color: #aaa;
    }
    width: 70%;
    margin-top: 10px;
    padding: 10px;
`;
const StyledButton = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-top: 50px;
    padding: 10px 50px;
    background-color: darkgray;
    color: black;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid black;
`;


export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");

    const handleSubmit = async () => {
        const checkURL = url.startsWith("http://") || url.startsWith("https://");
        if (!checkURL) {
            console.error("Invalid URL");
            return;
        }

        const shortenedUrl = `${window.location.origin}/${alias}`;
        const result = await createShortenedUrl(alias, url, shortenedUrl);

        if (result) {
            setShortenedUrl(result.shortenedUrl);
        } else {
            console.error("Failed to create shortened URL");
        }
    };

    return (
        <StyledDiv>

            <StyledInnerDiv>
                <StyledH1>URL Shortener</StyledH1>
        
                <StyledInput
                    type="text"
                    value={ alias }
                    placeholder="Alias"
                    onChange={(e) => setAlias(e.target.value)}/>
        
                <StyledInput
                    type="text"
                    value={ url }
                    placeholder="URL"
                    onChange={(e) => setUrl(e.target.value)}/>

                <StyledButton onClick={handleSubmit}>Submit</StyledButton>
                {shortenedUrl && (<p>Shortened URL: <Link href={shortenedUrl}>{shortenedUrl}</Link></p>)}

            </StyledInnerDiv>
        
        </StyledDiv>
    );
}

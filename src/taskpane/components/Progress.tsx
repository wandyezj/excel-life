import * as React from "react";

interface ProgressProps {
    title: string,
    logo: string,
    message: string,
}

export default class Progress extends React.Component<ProgressProps> {
    render() {
        return (<p>Loading</p>);
    }
}
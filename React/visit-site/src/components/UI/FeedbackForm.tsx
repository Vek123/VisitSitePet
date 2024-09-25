import React from "react";

import PageName from "./PageName";


interface FeedbackFormProps {
    pageName: string,
}
interface FeedbackFormState {

}

export default class FeedbackForm extends React.Component<FeedbackFormProps, FeedbackFormState> {
    render() {
        return (
            <>
                <PageName name={this.props.pageName}/>
            </>
        )
    }
}
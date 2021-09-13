import React, {useState} from "react";

import {Editor, EditorContext, WithEditorActions} from "@atlaskit/editor-core";
import {LoadingButton as Button} from "@atlaskit/button";
import {DateTimePicker} from "@atlaskit/datetime-picker";
import Textfield from "@atlaskit/textfield";
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent';

import styled from "styled-components";

export default function NewComment({onCreateComment}) {
    const [isExpanded, setExpanded] = useState(false);

    return isExpanded ? <NewCommentExpanded onComment={async ({content, dateTime}) => {
            await onCreateComment({content, dateTime});
            setExpanded(false);
        }} onCancel={() => setExpanded(false)}/> :
        <NewCommentCollapsed onExpand={() => setExpanded(true)}/>;
}

function NewCommentCollapsed({onExpand}) {
    return <Textfield placeholder="Schedule a comment..." onClick={onExpand} onFocus={onExpand}/>;
}

function NewCommentExpanded({onComment, onCancel}) {
    const [dateTime, setDateTime] = useState(new Date().toISOString());
    const [content, setContent] = useState();
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();

        setSubmitting(true);
        await onComment({content, dateTime});
        setSubmitting(false);
    };

    return <form onSubmit={onSubmit}>
        <EditorContext>
            <WithEditorActions render={actions =>
                <Editor placeholder="Schedule a comment..." disabled={isSubmitting} appearance="comment"
                        onChange={async () => setContent(await actions.getValue())}/>
            }/>
        </EditorContext>
        <ButtonContainer>
            <DateTimePicker
                isDisabled={isSubmitting}
                datePickerProps={{
                    selectProps: {menuPlacement: "top"}
                }}
                datePickerSelectProps={{menuPlacement: "top"}}
                timePickerSelectProps={{menuPlacement: "top"}}
                spacing="compact"
                innerProps={{style: {width: 200}}}
                value={dateTime}
                onChange={setDateTime}
            />
            <Button isDisabled={isSubmitting || !content || content.content.length === 0} isLoading={isSubmitting}
                    appearance="primary" type="submit"
                    iconBefore={<EmojiFrequentIcon/>}>Schedule</Button>
            <Button appearance="subtle" onClick={onCancel}>Cancel</Button>
        </ButtonContainer>
    </form>;
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  > * { margin: 5px; }
`;
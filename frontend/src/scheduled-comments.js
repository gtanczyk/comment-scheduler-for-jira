import React, {useEffect, useState} from "react";
import {useAsync} from "react-async-hook";
import styled from "styled-components";

import {renderDocument, TextSerializer} from '@atlaskit/renderer';
import {Date as AkDate} from '@atlaskit/date';
import {invoke} from "./invoke";
import Button, {ButtonGroup} from "@atlaskit/button";
import EditorRemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import SendIcon from "@atlaskit/icon/glyph/send";

const serializer = new TextSerializer();

export default function ScheduledComments({comments}) {
    if (comments.length === 0) {
        return null;
    }

    return <>
        <h3>Scheduled comments</h3>
        {comments.map(comment => <Comment key={comment.id} {...comment} />)}
    </>;
}

function Comment({content, dateTime, id}) {
    return <CommentRow>
        <p>{renderDocument(content, serializer).result}</p>
        <AkDate value={Date.parse(dateTime)}/>
        <CommentControls id={id}/>
    </CommentRow>;
}

function CommentControls({id}) {
    const [isLoading, setLoading] = useState(false);

    return <ButtonGroup>
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={async () => {
            setLoading(true);
            await invoke('delete', {id});
            await reloadComments();
            setLoading(false);
        }} iconBefore={<EditorRemoveIcon />}>Delete</Button>
        <Button isLoading={isLoading} isDisabled={isLoading} onClick={async () => {
            setLoading(true);
            await invoke('flush-comment', {id});
            await reloadComments();
            setLoading(false);
        }} iconBefore={<SendIcon />}>Send now</Button>
    </ButtonGroup>;
}

let reloadListener;

async function reloadComments() {
    if (reloadListener) {
        await reloadListener();
    }
}

export function useCommentsAsync() {
    const comments = useAsync(() => {
        return invoke('get-all');
    }, []);

    useEffect(() => {
        reloadListener = async () => {
            await comments.execute();
        }
    }, []);

    return comments;
}

const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 10px;
  
  > p {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  > div:last-child {
    flex-shrink: 0;
  }
`;
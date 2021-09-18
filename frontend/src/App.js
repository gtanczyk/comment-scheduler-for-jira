import React, {useEffect, useState, Fragment} from 'react';
import NewComment from "./new-coment";
import ScheduledComments, {useCommentsAsync} from "./scheduled-comments";
import ProgressBar from "@atlaskit/progress-bar";
import {invoke} from "./invoke";
import styled from "styled-components";

export default function App() {
    const commentsAsync = useCommentsAsync();

    if (commentsAsync.loading) {
        return <ProgressBar isIndeterminate/>;
    }

    return <AppContainer>
        <NewComment onCreateComment={async ({content, dateTime}) => {
            await invoke('create', {content, dateTime});
            commentsAsync.execute();
        }}/>
        <ScheduledComments comments={commentsAsync.result}/>
    </AppContainer>;
}

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;
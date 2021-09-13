import {storage} from "@forge/api";
import {addComment} from "./comments";

const commentsCache = {};

async function getComment(id) {
    if (commentsCache[id]) {
        return commentsCache[id];
    }
    let list = (await storage.query().getMany()).results; // TODO: a proper query if possible
    for (const {key, value} of list) {
        for (const comment of value) {
            if (comment.id === id) {
                return (commentsCache[id] = [comment, key, value]);
            }
        }
    }
}

export async function flushComment(id) {
    const [comment, key, value] = await getComment(id);

    console.log("FLUSHING COMMENT", comment);

    if (comment && comment.issueId && comment.content && !comment.isSent) {
        if (!comment.dateTime) {
            return "SKIP, NO DATE TIME";
        }

        if (new Date(comment.dateTime).getTime() > Date.now()) {
            return "SKIP, NOT YET";
        }

        console.log("COMMENT", comment);
        comment.isSent = true; // do it better, use comment properties?
        console.log("MARK AS SENT")
        await storage.set(key, value);
        console.log("ADD COMMENT")
        await addComment(comment.issueId, comment.content);
        return "COMMENT ADDED";
    } else {
        return "COMMENT NOT FOUND";
    }
}

export async function flushComments() {
    let list = (await storage.query().getMany()).results;
    for (const {key, value} of list) {
        console.log("LIST", key, value);
        for (const comment of value) {
            commentsCache[comment.id] = [comment, key, value];
            console.log(await flushComment(comment.id));
        }
    }
}
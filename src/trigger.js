import {storage} from "@forge/api";
import {flushComments} from "./service";

export const handler = async (event) => {
    console.log("EVENT", event);
    await flushComments();
};
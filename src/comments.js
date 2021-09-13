import api from "@forge/api";

export async function addComment(issueId, message) {
    /**
     * @issueId - the Jira issueId number for the issue that this function will try to add
     * a comment to (as per the Jira Rest API)
     * @message {string} - the message that will appear in the comment
     *
     * @example addComment('10050', 'f5ce5f0a-3ab7-404a-b96b-96ebbd79102f', 'Hello world')
     */

        // You'll come back to this later
    const requestUrl = `/rest/api/3/issue/${issueId}/comment`;
    const body = {
        "body": message
    };

    console.log("ADD COMMENT", requestUrl);

    // Use the Forge Runtime API to fetch data from an HTTP server using your (the app developer) Authorization header
    let response = await api.asApp().requestJira(requestUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    // Error checking: the Jira issue comment Rest API returns a 201 if the request is successful
    if (response.status !== 201) {
        console.log(response.status);
        throw `Unable to add comment to issueId ${issueId} Status: ${response.status}.`;
    }

    return response.json();
}
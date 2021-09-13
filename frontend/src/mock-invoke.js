let items = [{
    id: 1,
    content: {
        "type": "doc",
        "version": 1,
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "Hello"
                    }
                ]
            }]
    },
    dateTime: new Date().toISOString()
}];

export default async function invoke(methodName, ...args) {
    console.log(methodName, ...args);
    await sleep(1000);

    if (methodName === "get-all") {
        return items;
    } else if (methodName === "create") {
        const [payload] = args;
        const comment = {id: Date.now(), ...payload};
        items.push(comment);
        return comment;
    } else if (methodName === "flush-comments") {
        await sleep(1000);
    } else if (methodName === "delete") {
        const [{id}] = args;
        items = items.filter(item => item.id !== id);
    }
};

function sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
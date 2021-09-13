import Resolver from '@forge/resolver';
import api, {  storage } from '@forge/api';
import {flushComment} from "./service";

const resolver = new Resolver();

const getUniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const getListKeyFromContext = (context) => {
  const { localId: id } = context;
  return id.split('/')[id.split('/').length - 1];
}

const getAll = async (listId) => {
  let list = await storage.query().getMany();
  return (await storage.get(listId) || []).filter(item => item.issueId && item.content && !item.isSent);
}

resolver.define('get-all', ({ context }) => {
  return getAll(getListKeyFromContext(context));
});

resolver.define('create', async ({ payload, context }) => {
  const listId = getListKeyFromContext(context);
  const records = await getAll(listId);
  const id = getUniqueId();

  const newRecord = {
    id,
    content: payload.content,
    dateTime: payload.dateTime,
    issueId: context.extension.issue.id,
    ts: Date.now()
  };

  await storage.set(getListKeyFromContext(context), [...records, newRecord]);

  return newRecord;
});

resolver.define('update', async ({ payload, context }) => {
  const listId = getListKeyFromContext(context);
  let records = await getAll(listId);

  records = records.map(item => {
    if (item.id === payload.id) {
      return payload;
    }
    return item;
  })

  await storage.set(getListKeyFromContext(context), records);

  return payload;
});

resolver.define('delete', async ({ payload, context }) => {
  const listId = getListKeyFromContext(context);
  let records = await getAll(listId);

  records = records.filter(item => item.id !== payload.id)

  await storage.set(getListKeyFromContext(context), records);

  return payload;
});

resolver.define('flush-comment', async ({ payload }) => {
  console.log("FLUSH COMMENT", payload.id);
  let result = await flushComment(payload.id);
  console.log("FLUSH RESULT", result);
  return {result};
});

export const handler = resolver.getDefinitions();

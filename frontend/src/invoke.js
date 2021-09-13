import mockInvoke from "./mock-invoke";
import forgeInvoke from "./forge-invoke";

const isDev = window.location.search === "?mock";

export const invoke = isDev ? mockInvoke : forgeInvoke;
import { getContext, setContext } from "svelte";

/**
 * Minimal stub of frame's app-context. The imported Tempest components only
 * need `keyboard` (for table selection shortcuts) and `routes` (for hrefs).
 * Routes is a recursive proxy so any `routes.a.b.c(id)` chain resolves to "#".
 */

const KEY = Symbol("app-context");

export type KeyboardModifier = "shift" | "option" | "command" | "control";
export type KeyboardValue = {
  key: string | null;
  modifiers: KeyboardModifier[];
  pressing?: boolean;
};

function createKeyboard() {
  let state = $state<KeyboardValue | undefined>();
  return {
    get state() {
      return state;
    },
    update: (value: KeyboardValue | undefined) => (state = value),
  };
}

function createRoutesProxy(): any {
  const target = () => "#";
  return new Proxy(target, {
    get: (_t, prop) =>
      prop === "toString" || prop === Symbol.toPrimitive ? () => "#" : createRoutesProxy(),
    apply: () => "#",
  });
}

export function setAppContext() {
  const keyboard = createKeyboard();
  const routes = createRoutesProxy();
  const selectedOrg = { id: "org", name: "Tempest", slug: "tempest", logo: null, createdAt: "" };

  const ctx = { keyboard, routes, selectedOrg, matchesRole: () => true };
  setContext(KEY, ctx);
  return ctx;
}

export function getAppContext() {
  return getContext<ReturnType<typeof setAppContext>>(KEY);
}

import { useEffect, useState } from 'react';

export type SimpleReactiveStore = ReturnType<typeof createSimpleReactiveStore>;

export function createSimpleReactiveStore() {
  const data = new Map<string, any>();
  const registry = new Map<string, Set<React.Dispatch<any>>>();

  function setValue(path: string, value: unknown) {
    data.set(path, value);
    const listeners = registry.get(path);
    if (!listeners) {
      return;
    }
    listeners.forEach((li) => li(value));
  }

  function useValue<T>(path: string, defaultValue?: T) {
    const [value, setValue] = useState(data.get(path) || defaultValue);

    useEffect(() => {
      if (!registry.has(path)) {
        registry.set(path, new Set());
      }
      if (registry.get(path)?.has(setValue)) {
        return;
      }
      registry.get(path)!.add(setValue);
      return () => {
        registry.get(path)?.delete(setValue);
      };
    }, [path]);

    return value;
  }

  return {
    useValue,
    setValue,
  };
}
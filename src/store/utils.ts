/**
 * 1.取到每一个namespace 中核心的 getters
 *
 */

import { modules } from "./modules";
type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown;

type GetGetters<Modules> = {
  [K in keyof Modules]: GetGetter<Modules[K]>;
};

type MyGetters = GetGetters<typeof modules>;
type Addprefix<P, K> = `${P & string}/${K & string}`;
type GetSpliceKey<P, Module> = Addprefix<P, keyof Module>;

type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<K, Modules[K]>;
}[keyof Modules];

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];

type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}`
    ? GetFunc<T, A, B>
    : unknown;
};

type ModuleGetters = GetSpliceObj<MyGetters>;

type Getters = {
  [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
};
export { type Getters };

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_LOCAL_STORAGE_DB: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

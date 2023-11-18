// tauri.d.ts
interface TauriCustomType {
    // Define the structure of your custom Tauri object here
    // For example:
    // someMethod(): void;
  }
  
  declare global {
    interface Window {
      __TAURI__: TauriCustomType;
    }
  }
  
  export {};
  
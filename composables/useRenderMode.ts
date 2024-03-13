export const useRenderMode = () => useState<'preview' | 'render' | 'custom'>('render-mode', () => 'preview')

export const useCustomRenderSize = () => useState<{ height: number, width: number }>('custom-render-size', () => ({ height: 2000, width: 2000 }))

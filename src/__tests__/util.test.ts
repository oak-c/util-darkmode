import { darkmode } from '../util'

test('test', () => {
    const originalWindow = { ...window }
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(
        () =>
            ({
                ...originalWindow,
                matchMedia: () => ({
                    matches: true,
                    addListener: (fn: any) => fn({ matches: true }),
                    removeListener: () => void 0,
                }),
            } as any)
    )
    expect(darkmode((e, k) => {}).removeListeners())
})

test('test1', () => {
    const originalWindow = { ...window }
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(
        () =>
            ({
                ...originalWindow,
                matchMedia: () => ({
                    matches: true,
                    addListener: () => void 0,
                    removeListener: () => void 0,
                }),
            } as any)
    )
    expect(darkmode((e, k) => {}).removeListeners())
})

test('test2', () => {
    const originalWindow = { ...window }
    const windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(
        () =>
            ({
                ...originalWindow,
                matchMedia: () => ({
                    matches: false,
                    addListener: () => void 0,
                    removeListener: () => void 0,
                }),
            } as any)
    )
    expect(darkmode((e, k) => {}).removeListeners())
})

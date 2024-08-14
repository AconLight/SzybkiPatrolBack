

export const checkTimer = (timer) => {
    return parseInt(timer) < Date.now() / 1000.0
}
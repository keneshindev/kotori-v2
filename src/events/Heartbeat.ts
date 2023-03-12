export function createHeartbeat(sequence: number | null) {
    return {
        op: 1,
        d: sequence
    }
}
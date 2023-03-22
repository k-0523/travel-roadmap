export interface TypeTransportation {
    id: number
    label: string
    value: number
}

export var TransportationArray: TypeTransportation[] = [
    { id: 1, label: "徒歩", value: 1 },
    { id: 2, label: "車", value: 2 },
    { id: 3, label: "電車", value: 3 },
    { id: 4, label: "飛行機", value: 4 },
    { id: 5, label: "バス", value: 5 },
]
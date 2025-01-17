export interface Usecase<IN, OUT> {
    execute(dto: IN): Promise<OUT>;
}

export const Usecase = Symbol('Usecase');
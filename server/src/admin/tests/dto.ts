import { IsNotEmpty, IsOptional } from "class-validator";


interface Questions {
    question: string
    AnswerOptions: AnswerOptions[]
}

interface AnswerOptions {
    asnwer: string
    isCorrect: boolean
}

export class CreateTest {
    @IsOptional()
    id?: number

    @IsNotEmpty()
    headline: string

    @IsNotEmpty()
    minpass: number

    @IsNotEmpty()
    questions: Questions[]
}
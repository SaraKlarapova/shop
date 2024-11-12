import { IsNotEmpty, IsOptional } from "class-validator"

export class PassTest {
    @IsNotEmpty()
    answers: Record<number, number>

    @IsNotEmpty()
    testId: number
}
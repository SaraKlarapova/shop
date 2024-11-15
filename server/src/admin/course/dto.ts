import { IsNotEmpty, IsOptional } from "class-validator";

export interface Option {
    value: string;
    label: string;
}

export class Upsert {
    @IsNotEmpty()
    text: string

    @IsOptional()
    id: string

    @IsOptional()
    video: string

    @IsOptional()
    textPreview: string

    @IsOptional()
    linkVk: string

    @IsOptional()
    linkTelegram: string

    @IsOptional()
    minutes: string

    @IsOptional()
    image: string

    @IsOptional()
    price: string

    @IsNotEmpty()
    headline: string

    @IsOptional()
    relatedTests: Option[]
}

export interface Option {
    value: string;
    label: string;
}

export class CreateMember {
    @IsNotEmpty()
    id: number
}
export interface IRegisterForm {
    email: string
    name: string
    password: string
    confirmPassword: string
}

export interface ISignInForm {
    email: string
    password: string
}

export interface IUsers {
    id: number;
    createdAt: Date;
    email: string;
    name: string;
    role: 'USER' | 'ADMIN';
    isEmailActivated: boolean;
    password: string;
    code_change_password?: number; // Optional field
    code_confirmation_email?: string; // Optional field
    twoFactorAuthenticationSecret?: string; // Optional field
    isTwoFactorAuthenticationEnabled?: boolean; // Optional field
    Course: ICourse[]; // This represents the relation to the Course model
}

export interface Questions {
    question: string
    AnswerOptions: AnswerOptions[]
}

interface AnswerOptions {
    asnwer: string
    isCorrect: boolean
}

export interface ISignRes {
    email: string
    isTwoFactorAuthenticationEnabled: boolean
    isEmailActivated: boolean
    access_token: string
    role: string
}

export interface ICreateTest {
    id?: number
    headline: string
    questions: Questions[]
}

export interface Option {
    value: string;
    label: string;
}

export interface ITest {
    id: number;
    createdAt: Date;
    headline: string;
    minimumQuestionsAnswered: number
    Questions: IQuestions[];
}

interface IAnswerOptions {
    id: number;
    createdAt: Date;
    asnwer: string;
    isCorrect: boolean;
    questionId: number;
    Questions: Questions;
}

export interface IQuestions {
    id: number;
    createdAt: Date;
    question: string;
    testId: number;
    Test: ITest;
    AnswerOptions: IAnswerOptions[];
}

export interface ICreateCourse {
    [key: string]: any
}

export interface ICreateMember {
    id: number
}

export interface ICourse {
    id: number
    createdAt: Date
    text: JSON
    video: string
    textPreview: JSON
    image: string
    headline: string
    linkVk: string
    linkTelegram: string
    numberOfUsers: number
    minutes: number
    price: number
    CourseTestRelation: CourseTestRelation[]
    Users: IUsers
}

export interface IGetCourseById {
    course: ICourse
    foundMember: boolean
}

export interface CourseTestRelation {
    id: number
    createdAt: string
    courseId: number
    testId: number
    Course: ICourse
    Test: ITest
}

export interface IPassTest {
    answers: Record<number, number>
    testId: number
}


export interface IPassTestResult {
    score: number
}
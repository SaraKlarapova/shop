import styles from '../index.module.scss'
import { Link, useNavigate, useParams } from "react-router-dom";
import { password } from 'zodTypes';
import { z } from 'zod';
import { IRegisterForm } from 'interfaces';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useJwtStore } from 'stores/jwt';
import { Error } from 'ui/error';
import { signUp } from 'api';
import { InputDark, InputLight } from 'ui/inputs/input';
import { Button, ButtonIndigo } from 'ui/buttons';
import { CheckboxUI } from 'ui/checkbox';
import { toast } from 'react-toastify';

export const validationSchema = z.object({
    name: z.string().min(1, "Fill out the name"),
    email: z.string().email(),
    password: password,
    confirmPassword: password,
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"]
        });
    }
});

type validationSchema = z.infer<typeof validationSchema>;

export const SignUp = () => {
    const [error, setError] = useState<string>("");
    const setRole = useJwtStore((state) => state.setRole);
    const setJwt = useJwtStore((state) => state.setJwt);

    const navigate = useNavigate();

    const createUser = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            setJwt(data.access_token)
            setRole(data.role)
            navigate(`/admin-panel`)
        },
        onError: (error: any) => {
            toast.error("Пользователь с такой почтой уже существует.")
        }
    })

    const { isLoading } = createUser;

    const onSubmit = (values: validationSchema) => {
        setError('')
        createUser.mutate({ ...values })
    };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    return (
        <div className={styles.auth}>
            <div className={styles.headline}>Регистрация</div>
            <form className={styles.form}>
                <div className={styles.inputs}>
                    <InputLight className={styles.input} label='Имя' type='text' register={register} name={'name'} error={errors.name} autoComplete={'given-name'}></InputLight>
                    <InputLight className={styles.input} label='Почта' type='text' register={register} name={'email'} error={errors.email} autoComplete={'email'}></InputLight>
                    <InputLight className={styles.input} label='Пароль' type="password" register={register} name={'password'} error={errors.password} autoComplete={'new-password'}></InputLight>
                    <InputLight className={styles.input} label='Подтвердите пароль' type='password' register={register} name={'confirmPassword'} error={errors.confirmPassword} autoComplete={'new-password'}></InputLight>
                    <div className={styles.group}>
                        <ButtonIndigo isLoading={isLoading} onClick={handleSubmit(onSubmit)}>Зарегистрироваться</ButtonIndigo>

                        <p className={styles.link}>
                            <Link to={`/auth/sign-in`}>
                                Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}


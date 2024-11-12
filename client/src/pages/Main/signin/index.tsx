import styles from '../index.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonIndigo } from 'ui/buttons';
import { password } from 'zodTypes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { useJwtStore } from 'stores/jwt';
import { Error } from 'ui/error';
import { signIn } from 'api';
import { toast } from 'react-toastify';
import { InputLight } from 'ui/inputs/input';

const validationSchema = z.object({
    email: z.string().email(),
    password,
});

type validationSchema = z.infer<typeof validationSchema>;

export const SignIn = () => {
    const [error, setError] = useState('')
    const setRole = useJwtStore((state) => state.setRole);
    const setJwt = useJwtStore((state) => state.setJwt);



    const navigate = useNavigate();


    const logUser = useMutation({
        mutationFn: signIn,
        onSuccess: async (data) => {
            setJwt(data.access_token)
            setRole(data.role)
            if (!data.isEmailActivated) {
                return navigate('/auth/email-confirm')
            }
            if (data.isTwoFactorAuthenticationEnabled) {
                return navigate('/auth/two-factor')
            }
            navigate('/panel')
        },
        onError: (error: any) => {
            console.log(error)
            setError(error.response?.data?.message);
            toast.error('Неправильный пароль или почта')
        }
    })

    const { isLoading } = logUser;

    const onSubmit = (values: validationSchema) => {
        setError('')
        logUser.mutate(values)
    };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    return (
        <div className={styles.auth}>
            <div className={styles.headline}>Авторизация</div>
            <form className={styles.form}>
                <div className={styles.inputs1fr}>
                    <InputLight className={styles.input} label='Почта' type='text' register={register} name={'email'} error={errors.email} autoComplete={'email'}></InputLight>
                    <InputLight className={styles.input} label='Пароль' type="password" register={register} name={'password'} error={errors.password} autoComplete={'new-password'}></InputLight>
                    <div className={styles.group}>
                        <ButtonIndigo isLoading={isLoading} onClick={handleSubmit(onSubmit)}>Войти</ButtonIndigo>
                        <div className={styles.flexSpaceBetween}>
                            <p className={styles.link}>
                                <Link to={`/auth/sign-up`}>
                                    Регистрация
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    );
}


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
import { AuthForm } from 'components/auth-form';

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
            navigate('/')
        },
        onError: (error: any) => {
            console.log(error)
            setError(error.response?.data?.message);
            toast.error('Неправильные пароль или почта')
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
        <AuthForm title='Login' subtitle='Welcome back! Please log in to access your account.'>
            <InputLight className={styles.input} label='Почта' type='text' register={register} name={'email'} error={errors.email} autoComplete={'email'}></InputLight>
            <InputLight className={styles.input} label='Пароль' type="password" register={register} name={'password'} error={errors.password} autoComplete={'new-password'}></InputLight>
            <ButtonIndigo isLoading={isLoading} onClick={handleSubmit(onSubmit)}>Войти</ButtonIndigo>
            <div className={styles.flexSpaceBetween}>
                <p className={styles.link}>
                    <Link to={`/auth/sign-up`}>
                        Регистрация
                    </Link>
                </p>
            </div>
        </AuthForm>
    );
}


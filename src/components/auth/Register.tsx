import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastService } from '../../services/common/ToastService';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/auth/AuthService';
import { registerSchema } from '../../validations/auth/RegisterSchema';

// Definindo os tipos para os campos do formulário
interface IRegisterForm {
    name: string;
    email: string;
    password_hash: string;
    role: "admin";
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { registro } = useAuth(); // Obter a função de login do contexto

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IRegisterForm>({ resolver: zodResolver(registerSchema) });

    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        try {
            const res = await AuthService.register({
                ...data,
                role: "admin"
            });
            ToastService.success('Cadastro realizado com sucesso!');
            navigate('/login');
        } catch (error: any) {
            ToastService.error(error.error || 'Erro ao fazer o cadastro');
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-10 h-10 mr-2" src="truck.png" alt="logo" />
                        Manutenção de Frota
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Faça seu cadastro
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                {/* <input type="hidden" value={'admin'} {...register('role')} /> */}
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seu e-mail</label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sua senha</label>
                                    <input
                                        type="password"
                                        {...register('password_hash')}
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    {errors.password_hash && <p className="text-red-500 text-sm">{errors.password_hash.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    disabled={isSubmitting}
                                >
                                    Entrar
                                </button>

                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Já tenho conta. <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login aqui</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;

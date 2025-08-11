import { cva } from 'class-variance-authority';

export const buttonStyle = (isDisabled: boolean): string =>
    cva(
        'cursor-pointer mt-4 text-white py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 self-end',
        {
            variants: {
                disabled: {
                    true: 'bg-indigo-400 cursor-not-allowed opacity-50',
                    false: 'bg-indigo-500 hover:bg-indigo-400',
                },
            },
            defaultVariants: {
                disabled: isDisabled,
            },
        }
    )();

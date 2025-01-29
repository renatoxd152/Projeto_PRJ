import { Input, Text } from "@chakra-ui/react";
import { FormikProps } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Cliente } from "../../app/models/clientes";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    type: string;
    formik?: FormikProps<Cliente>;
    name: string;
    comprimento?:number;
}

export const InputPersonalizado: React.FC<InputProps> = ({
    label,
    error,
    type,
    formik,
    name,
    comprimento,
    onChange,
}: InputProps) => {
    return (
        < >
            <Text fontWeight="bold" mb="1">
                {label}
            </Text>
            <Input
                type={type}
                name={name}
                value={formik?.values[name as keyof Cliente]}
                onChange={onChange}
                borderColor={error ? "red.500" : "gray.200"}
                _hover={{
                    borderColor: error ? "red.600" : "gray.400",
                }}
                _focus={{
                    borderColor: error ? "red.600" : "blue.500",
                }}
                maxLength={comprimento}
            />
            {error && (
                <Text color="red.500" fontSize="sm" mt="1" className="error-text">
                    {error}
                </Text>
            )}
        </>
    );
};

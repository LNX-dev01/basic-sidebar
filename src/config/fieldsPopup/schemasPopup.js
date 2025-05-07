import Joi from "joi";

const schemaUser = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      "string.empty": "Por favor, ingresa tu nombre",
      "string.pattern.base": "El nombre solo deben contener letras",
    }),
  lastname: Joi.string()
    .pattern(/^[A-Za-z]+$/)
    .required()
    .messages({
      "string.empty": "Por favor, ingresa tu apellido",
      "string.pattern.base": "Los apellidos solo deben contener letras",
    }),
  photo: Joi.any().optional().allow(null), // Archivo no requerido
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "Por favor, ingresa tu número de teléfono",
      "string.pattern.base": "No se permiten letras solo numeros(10 dígitos)",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Por favor, ingresa tu correo",
      "string.email": "Por favor, ingresa un correo válido",
    }),
});

export { schemaUser };

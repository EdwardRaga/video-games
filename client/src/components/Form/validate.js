export default function validate(state) {
    const errors = {};
  
    function validateField(fieldName, fieldValue, regex, message) {
      if (!fieldValue) {
        errors[fieldName] = `Por favor ingrese un ${fieldName}`;
      } else if (regex && regex.test(fieldValue)) {
        errors[fieldName] = message;
      }
    }
  
    validateField("name", state.name, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "No debe contener caracteres especiales");
    validateField("description", state.description, /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "No debe contener caracteres especiales");
    validateField("release", state.release, null, null);
    validateField("background_image", state.background_image, null, null);
    validateField("genres", state.genres?.length, null, "Por favor seleccione minimo un genero");
    validateField("platforms", state.platforms?.length, null, "Por favor seleccione minimo una plataforma");
    validateField("rating", state.rating, null, "Por favor ingrese un numero entre 0 y 5");
  
    return errors;
  }
  
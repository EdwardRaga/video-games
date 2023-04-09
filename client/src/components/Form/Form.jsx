import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaforms, getGenres, addGame } from "../../redux/action/action";
import validate from "./validate";

import style from "./Form.module.css";
import Loading from "../Loading/Loading";

export default function Form() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  //stado global GENEROS Y PLATAFORMAS
  const state = useSelector((state) => ({
    genres: state.genres,
    platforms: state.platforms,
  }));

  //estado del formulario
  const [input, setInput] = useState({
    name: "",
    description: "",
    release: "",
    background_image: null,
    platforms: [],
    genres: [],
    rating: "",
  });

  useEffect(() => {
    dispatch(getPlaforms());
    dispatch(getGenres());
  }, []);

  //manejar errores
  useEffect(() => {
    setError(validate(input));
  }, [input]);

  //manejador de eventos para el input de tipo file y el select
  const handleChange = (event) => {
    const { name, value, files, options, id } = event.target;

    if (name === "background_image") {
      //FileRader solo puede acceder al contenido de los archivos que el usuario ha seleccionado explícitamente, ya sea usando un elemento HTML <input type="file"> o arrastrando y soltando. No se puede usar para leer un archivo por nombre de ruta del sistema de archivos del usuario
      setInput({
        ...input,
        background_image: files[0],
      });
    } else if (name === "platforms") {
      // actualizando el estado de las plataformas seleccionadas
      //recorrer opctions lugar donde estan todas las opciones del select
      //con la propiedad selected indentificamos las selecionadas
      //por ultimo set up el stado
      const selectedValues = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedValues.push(options[i].id);
        }
      }
      setInput({
        ...input,
        platforms: [...selectedValues],
      });
    } else if (name === "genres") {
      const selectedValues = [];
      const checkboxes = document.getElementsByName("genres");
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedValues.push(checkboxes[i].id);
        }
      }
      setInput({
        ...input,
        genres: [...selectedValues],
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append("name", input.name);
    form.append("description", input.description);
    form.append("release", input.release);
    form.append("background_image", input.background_image);
    form.append("platforms", input.platforms);
    form.append("genres", [...input.genres]);
    form.append("rating", input.rating);
    console.log(form);

    if(Object.keys(error).length === 0){
      //hacer el post
    setLoading(true);
    addGame(form).then((response) => {
      setLoading(false);
      setMessage(response?.data);

      //limpiar el formulario
      setInput({
        ...input,
        name: "",
        description: "",
        release: "",
        background_image: null,
        platforms: [],
        genres: [],
        rating: "",
      })
     
    });
    }
  };
  return (
    <div className={style.wrapper}>
      {loading && <Loading />}
      {!loading && (
        <form
          onSubmit={handleSubmit}
          action="/videogames"
          method="post"
          encType="multipart/form-data"
        >
          <div className={style.name}>
            <label>Name</label>
            <input
              onChange={handleChange}
              name={"name"}
              type="text"
              value={input.name}
              required
            />
          </div>
          {error && error?.name}

          <div className={style.background_image}>
            <label>Image</label>
            <input
              onChange={handleChange}
              accept="image/*"
              name={"background_image"}
              type="file"
            />
          </div>
            {error && error?.background_image}

          <div className={style.description}>
            <label>Description</label>
            <textarea
              onChange={handleChange}
              name={"description"}
              type="text"
            />
          </div>
          {error && error?.description}

          <div className={style.container_genres}>
            <label>Genres</label>
            <div className={style.genres}>
              {state?.genres.map((genre) => {
                return (
                  <label>
                    <input
                      name={"genres"}
                      onChange={handleChange}
                      id={genre.id}
                      type="checkbox"
                      value={genre.name}
                      />
                    {genre.name}
                  </label>
                );
              })}
            </div>
          </div>
          {error && error?.genres}

          <div className={style.release}>
            <label>Realese</label>
            <input
              onChange={handleChange}
              name={"release"}
              type="date"
              required
              oninvalid="this.setCustomValidity('User ID is a must')"
              />
          </div>
          {error && error?.release}

          <div className={style.platforms}>
            <label>Platforms</label>
            <select
              multiple
              id="platforms"
              name="platforms"
              onChange={handleChange}
              required
              >
              {state?.platforms.map((platform) => {
                return (
                  <option
                    id={platform.id}
                    key={platform.id}
                    value={platform.nombre}
                  >
                    {platform.name}
                  </option>
                );
              })}
            </select>
          </div>
          {error && error?.platforms}

          <div className={style.rating}>
            <label>Reting</label>
            <input
              onChange={handleChange}
              name={"rating"}
              type="number"
              min="0"
              max="5"
              required
            />
          </div>
          {error && error?.rating}

          <input type="submit" />
          {message && <p id={style.msg}>{message?.msg}</p>}
        </form>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetGenres, CreateVideogame } from '../../redux/actions';
import NavBar from "../NavBar/NavBar.jsx";
import './Form.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[\s\S]{3,20}$/.test(input.name)) {
      errors.name = 'Name is invalid required 3 to 20 characters';
    }

    if(!input.description){
      errors.description = "Description is required";
    } else if(!/^[\s\S]{10,500}$/.test(input.description)) { //entre 10-500 caracteres
      errors.description = "Description is invalid, required 10 to 500 characters";
    }

    if(!input.released){
        errors.released = "Date is required";
      } else if(!/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(input.released)) {  //dd/mm/aaaa formato
        errors.released = "Date is invalid, format required dd/mm/aaaa";
    }

    if(!input.rating){
        errors.rating = "Rating is required";
      } else if(!/^[1-4]+(\.+[0-9]{2})|5(\.)0{2}$/.test(input.rating)) { //rango 1.00 - 5.00
        errors.rating = "Rating is invalid, rangue 1.00 to 5.00, 2 decimal required...";
    }

    if(input.platforms.length < 1){
        errors.platforms = "Platform is required , min 1 platform";
    }

    if(input.genresId.length < 1){
        errors.id_genre = "Genres is required, min 1 genre";
    }

    if(!input.image){
        errors.image = "URL is required";
      } else if(!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(input.image)) {
        errors.image = "URL is invalid";
    }

    if(input.formError){
        errors.formError = 'Faltan datos...'
    }
  
    return errors;
};

const Form = () => {
    const plataformas = ['Xbox','PlayStation','Nintendo','Pc','Apple','Linux','Android','IOS','Atari','Sega'];

    const dispatch = useDispatch();
    const generos = useSelector( state => state.genres);

    const [input, setInput] = useState({
        name: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        image: '',
        genresId: [],
    });

    const [error, setError] = useState({});

    useEffect(() => {
        if(generos.length === 0) dispatch(GetGenres())
        // dispatch()
        console.log(input)
        // console.log(generos)
    },[input])

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value
        })
        setError(validate({
            ...input,
            [event.target.name] : event.target.value,
        }))
        // console.log(input);
    }

    const handleSelect = (event) => {
        if(event.target.checked){
            setInput({
                ...input,
                platforms : [...input.platforms, event.target.value]  //agrea datos a unarray por ejemplo para imprimirlo en pantala que 
                                        //datos han sido seleccionados ...
            });
            setError(validate({
                ...input,
                platforms : event.target.value,
            }));
        } else{
            let {platforms} = {...input}
            let filtro = platforms.filter( p => p !== event.target.value)
            setInput({
                ...input,
                platforms : filtro
            })
            setError(validate({
                ...input,
                platforms : filtro
            }));
            // console.log(platforms)
            console.log(filtro)
        }
        console.log(event.target.name, event.target.value ,event.target.checked)
    }

    const handleGenres = (e) => {
        if(e.target.checked){
            setInput({
                ...input,
                genresId : [...input.genresId, e.target.value]
            });
            setError(validate({
                ...input,
                genresId : [...input.genresId, e.target.value]
            }));
        } else{
            let {genresId} = {...input};
            let filtro = genresId.filter( p => p !== e.target.value);
            setInput({
                ...input,
                genresId : filtro,
            });
            setError(validate({
                ...input,
                genresId : filtro,
            }));
            console.log(filtro)
        }
        console.log(e.target.value ,e.target.checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(Object.keys(error).length === 0){
            dispatch(CreateVideogame(input));
            setInput({  //nos servira para enviar setear los inputs vacios cuando la info sea enviada por el form...
                name: '',
                description: '',
                released: '',
                rating: '',
                platforms: [],
                image: '',
                id_genre: '',
            })
            alert('Juego creado en la base de datos...')
        } else{
            alert('Error, some fields are missing, check again')
        }
    }

    return(
        <div className="formulario">
            <NavBar />
            <form onSubmit={(e) => handleSubmit(e)} className='FormularioControlado'>
                <h1 id="TitleForm">Crear nuevo videojuego</h1>
                <div className="seccion1Form"> 
                    <div key='NombreForm' className="NombreForm">
                        <label>Nombre</label>
                        <input 
                            type='text'
                            value={input.name}
                            name='name'
                            placeholder="inserte nombre de juego"
                            onChange={handleChange}
                        />
                        {error.name && <p className="danger">{ error.name }</p>}
                    </div>
                    <div key='FechaForm' className="FechaForm">
                        <label>Fecha</label>
                        <input 
                            type='text'
                            name='released'
                            value={input.released}
                            onChange={handleChange}
                        />
                        {error.released && <p className="danger">{ error.released }</p>}
                    </div>
                </div>

                <div key='DescriptionForm' className="DescriptionForm">
                    <label>Description</label>
                    <textarea value={input.description} name='description' onChange={handleChange} 
                        placeholder='Inserte la descripcion del juego' ></textarea>
                    {error.description && <p className="danger">{ error.description }</p>}
                </div>
                
                <div className="seccion2Form">
                    <div key='RatingForm' className="RatingForm">
                        <label>Rating</label>
                        <input 
                            type='number'
                            min='1.00'
                            max='5.00'
                            step='.05'
                            name='rating'
                            value={input.rating}
                            placeholder='Range 1-5'
                            onChange={handleChange}
                        />
                        {error.rating && <p className="danger">{ error.rating }</p>}
                    </div>
                    <div key='ImagenForm' className="ImagenForm">
                        <label>Imagen URL</label>
                        <input type='text' name='image' value={input.image} onChange={handleChange} 
                            placeholder='Inserte una URL de imagen'/>
                        {error.image && <p className="danger">{ error.image }</p>}
                    </div>
                </div>

                <div key='PlataformasForm' className="PlataformasForm">
                    <h4>Plataformas</h4>
                    {/* <input type="checkbox" value="xbox" id="product-1-1" name="check" onChange={handleSelect} /> xbox <br/>
                    <input type="checkbox" value="playstation" id="product-1-2" name="check" 
                        onChange={handleSelect} /> playstation <br/>
                    <input type="checkbox" value="pc" id="product-1-3" name="check" onChange={handleSelect} /> Pc <br/> */}
                    <div className="platformsCheck">
                      {
                        plataformas.map( p =>
                            <div className="itemPlatform">
                                <input key={p} type='checkbox' value={p} name={p} onChange={handleSelect} />
                                <label>{p}</label>
                                <br/>
                            </div>
                        ) 
                      }
                    </div>
                    {error.platforms && <p className="danger">{ error.platforms }</p>}
                </div>
                
                <div key='GenerosForm' className="GenerosForm">
                    <h4>Generos</h4>
                    <div className="genresCheck">
                        {
                            generos.map( g => 
                                <div className='itemGenre'>
                                    <input key={g.name+g.id} type='checkbox' value={g.id} onChange={handleGenres} />
                                    <label>{g.name}</label><br/>
                                </div>        
                            )
                        }
                    </div>
                    {error.id_genre && <p className="danger">{ error.id_genre }</p>}
                </div>
                <button type="submit" id="formButton">Crear juego</button>
                {/* {error.id_genre && <span className="danger">{ error.id_genre }</span>} */}
            </form>
        </div>
    )
}

export default Form;
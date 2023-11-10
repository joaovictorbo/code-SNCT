import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTodos } from "../../redux/slice/todo";
import React, { useRef } from "react";
import grupo from "../../Componentes/assets/grupo2.png";
import Modal from "../../Componentes/modalcopy";
import YouTube from 'react-youtube';
import "./get.css";
import ReCAPTCHA from "react-google-recaptcha"

const Dados = () => {
  const [posts, setPosts] = React.useState([]);
  const [escolas, setEscolas] = React.useState([]);
  const [selectedPolo, setSelectedPolo] = React.useState(null); // adicionamos o estado para armazenar o polo selecionado
  const [verifica, setVerifica] = React.useState(false); 
  const captchaRefs = useRef([]);
  const usedCaptchaRefs = useRef([]);
  const dataurl = "http://192.168.1.9:8000/Turma/";
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const opts = {
    height: '200',
    width: '289',
  }

  function onChange(value, index) {
    console.log("Captcha value:", value);
    setVerifica(true);
    usedCaptchaRefs.current.push(index);
  }
  const votar = async (id, index) => {
    const response = await axios.patch(dataurl + 'Votar/' + id + '/');
    usedCaptchaRefs.current = usedCaptchaRefs.current.filter((usedIndex) => usedIndex !== index);
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(dataurl);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEscola = async () => {
    try {
      const response = await axios.get(dataurl + 'escola/');
      const data = response.data;
      setEscolas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value; // armazenamos o valor selecionado
    setSelectedPolo(selectedValue); // atualizamos o estado com o polo selecionado
    // getTurmas(selectedValue); // chamamos a função getTurmas com o valor selecionado
  }

  React.useEffect(() => {
    dispatch(fetchTodos(selectedPolo))
    getEscola();

    getPosts();

  }, [selectedPolo]);

  return (
    <div
      className="main-background bg-image"
      style={{
        background: `url(${grupo}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #E2595E, #7AF0F6)",
        }}
      >
        <br></br>
        <p className="display-6 text-center text-wrap text-light">
        Página de votação Festival de Aplicativos da Iniciativa CODE
        </p>
        <br></br>
        <br></br>
      </div>
      <div className="col-12 justify-content-center">
        <div className="row justify-content-center">
          {state.todo.data && state.todo.data['results'].map((post, index) => (
            <div key={post.id} className="col-md p-4">
              <div
                key={post.id}
                className="card"
                style={{
                  width: "18rem",
                  backgroundImage:
                    "linear-gradient(to right, #D9666B, #98C5CB)",
                }}
              >
                <YouTube videoId={post.linkYoutube} opts={opts} />

                <div className="card-body">
                  <h5 className="card-title">{post.nomeAplicativo}</h5>
                  <p id="descricao" className="card-text">{post.descricao}</p>
                  <p className="m-0">
                    votos:{post.votos}


                    <button
                    id="redirect"
                      className="btn btn-primary votar"
                      style={{ float: "right" }}
                      disabled={!verifica}
                      onClick={(e) => {
                        votar(post.id, index);
                        setVerifica(false);
                        usedCaptchaRefs.current.forEach((usedIndex) => captchaRefs.current[usedIndex].reset());
                        dispatch(fetchTodos(selectedPolo));

                      }}
                    >
                      votar
                    </button>
                    <ReCAPTCHA
                      ref={(ref) => captchaRefs.current[index] = ref}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={(value) => onChange(value, index)}
                      style={{ transform: "scale(0.8)", WebkitTransform: "scale(0.8)", transformOrigin: "0 0", WebkitTransformOrigin: "0 0", marginTop: "20px" }}
                    />
                  </p>

                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dados;
